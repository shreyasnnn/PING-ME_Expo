import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import AttachMessageIcon from "../../../../assets/options/AttachMessageIcon";
import SendIcon from "../../../../assets/options/SendIcon";
import CustomButton from "./CustomButton";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";

export default function SendMessageContainer({ chatRoomId }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(0);
  const typingTimeout = useRef(null);
  const sender = auth().currentUser?.uid;

  // Keyboard event listeners
  useEffect(() => {
    const keyboardShow = Keyboard.addListener("keyboardDidShow", (e) => {
      setBottomOffset(e.endCoordinates.height);
    });
    const keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
      setBottomOffset(0);
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();

      if (sender && chatRoomId) {
        firestore()
          .collection("chats")
          .doc(chatRoomId)
          .collection("typing")
          .doc(sender)
          .set({ typing: false }, { merge: true });
      }
    };
  }, []);

  const updateTypingStatus = async (isTyping) => {
    if (!chatRoomId || !sender) return;
    await firestore()
      .collection("chats")
      .doc(chatRoomId)
      .collection("typing")
      .doc(sender)
      .set({ typing: isTyping });
  };

  const handleTyping = (text) => {
    setMessage(text);
    updateTypingStatus(true);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      updateTypingStatus(false);
    }, 2000);
  };

  const sendMessage = async ({ type = "text", content }) => {
    if (!chatRoomId || !sender || sending || (type === "text" && !content.trim())) return;

    try {
      setSending(true);

      const messageData = {
        sender,
        message_type: type,
        message_time: firestore.FieldValue.serverTimestamp(),
        client_time: new Date(),
      };

      if (type === "text") {
        messageData.message = content.trim();
      } else {
        messageData.media_url = content;
      }

      await firestore()
        .collection("chats")
        .doc(chatRoomId)
        .collection("messages")
        .add(messageData);

      const chatRoomRef = firestore().collection("chats").doc(chatRoomId);
      const chatRoomSnap = await chatRoomRef.get();

      if (!chatRoomSnap.exists) return;

      const chatRoomData = chatRoomSnap.data();
      const members = chatRoomData.members || [];
      const unseenCounts = chatRoomData.unseenCounts || {};

      members.forEach((memberUid) => {
        if (memberUid !== sender) {
          unseenCounts[memberUid] = (unseenCounts[memberUid] || 0) + 1;
        }
      });

      await chatRoomRef.update({
        lastMessage: {
          sender,
          time: firestore.FieldValue.serverTimestamp(),
          message: type === "text" ? content.trim() : (type === "image" ? "📷 Image" : "🎥 Video"),
        },
        unseenCounts,
      });

      setMessage("");
      updateTypingStatus(false);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleMediaPick = () => {
    launchImageLibrary(
      {
        mediaType: "mixed",
        quality: 0.8,
      },
      async (response) => {
        if (response.didCancel) return;
        if (response.errorMessage) {
          Alert.alert("Error", response.errorMessage);
          return;
        }

        const asset = response.assets[0];
        const fileName = `${Date.now()}_${asset.fileName}`;
        const ref = storage().ref(`chatMedia/${chatRoomId}/${fileName}`);

        try {
          const uploadTask = await ref.putFile(asset.uri);
          const downloadURL = await ref.getDownloadURL();

          const type = asset.type.startsWith("image") ? "image" : "video";
          sendMessage({ type, content: downloadURL });
        } catch (error) {
          console.error("Upload error:", error);
          Alert.alert("Upload Failed", "Could not upload file.");
        }
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.sendMsgContainer}>
          <CustomButton
            Icon={<AttachMessageIcon height={24} width={24} />}
            handleOnPress={handleMediaPick}
          />
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={handleTyping}
            multiline
            maxLength={1000}
            scrollEnabled
            textAlignVertical="top"
          />
          <CustomButton
            Icon={<SendIcon height={20} width={20} />}
            handleOnPress={() => sendMessage({ type: "text", content: message })}
            disabled={sending || !message.trim()}
          />
        </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    paddingBottom: Platform.OS === "ios" ? 16 : 8,
  },
  sendMsgContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#d9d9d9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    borderColor: "#d9d9d9",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#fff",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 8,
    maxHeight: 72,
    overflow: "scroll",
  },
});
