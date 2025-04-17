import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Text,
  TouchableOpacity,
  Clipboard,
  Alert,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useFocusEffect } from "@react-navigation/native";

import AppBarChatView from "./components/AppBarChatView";
import ChatBubble from "./components/ChatBubble";
import SendMessageContainer from "./components/SendMessageContainer";

const { height } = Dimensions.get("window");

export default function ChatView({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [contactStatus, setContactStatus] = useState({
    online: false,
    lastSeen: null,
  });

  const scrollViewRef = useRef();
  const { contact, chatRoomId, isGroupChat } = route.params;
  const currentUser = auth().currentUser?.uid;

  const handleLongPress = (msg, msgId) => {
    setSelectedMessage({ ...msg, id: msgId });
    setActionModalVisible(true);
  };

  const closeActionModal = () => {
    setActionModalVisible(false);
    setSelectedMessage(null);
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (isGroupChat || !contact?.userId) return;

    const contactRef = firestore().collection("users").doc(contact.userId);
    const unsubscribe = contactRef.onSnapshot((doc) => {
      const data = doc.data();
      setContactStatus({
        online: data?.online ?? false,
        lastSeen: data?.lastSeen ?? null,
      });
    });

    return () => unsubscribe();
  }, [contact?.userId, isGroupChat]);

  useFocusEffect(
    React.useCallback(() => {
      if (!chatRoomId || !currentUser) return;

      const resetUnseenCount = async () => {
        try {
          await firestore()
            .collection("chats")
            .doc(chatRoomId)
            .update({
              [`unseenCounts.${currentUser}`]: 0,
            });
        } catch (error) {
          console.error("Error resetting unseen count:", error);
        }
      };

      resetUnseenCount();
    }, [chatRoomId])
  );

  useEffect(() => {
    if (!chatRoomId) return;

    const chatRef = firestore()
      .collection("chats")
      .doc(chatRoomId)
      .collection("messages")
      .orderBy("message_time", "asc");

    const unsubscribe = chatRef.onSnapshot((snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(loadedMessages);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  useEffect(() => {
    if (!chatRoomId) return;

    const unsubscribeTyping = firestore()
      .collection("chats")
      .doc(chatRoomId)
      .collection("typing")
      .onSnapshot((snapshot) => {
        const typing = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.typing === true && doc.id !== currentUser) {
            typing.push(doc.id);
          }
        });
        setTypingUsers(typing);
      });

    return () => unsubscribeTyping();
  }, [chatRoomId]);

  const displayedMessages =
    typingUsers.length > 0
      ? [
          ...messages,
          {
            id: "typing-indicator",
            message: isGroupChat
              ? `${contact.name || "Someone"} is typing...`
              : "Typing...",
            sender: null,
            message_time: null,
            isTypingPlaceholder: true,
          },
        ]
      : messages;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ImageBackground
          source={require("../../../assets/Backgroud-image.jpg")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <AppBarChatView
            contact={contact}
            contactStatus={contactStatus}
            isGroupChat={isGroupChat}
            onBackPress={() => navigation.pop()}
            onMorePress={() => {}}
          />
        </ImageBackground>

        <View style={styles.chatContainer}>
          <Modal
            transparent
            visible={actionModalVisible}
            animationType="fade"
            onRequestClose={closeActionModal}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={closeActionModal}
              activeOpacity={1}
            >
              <View style={styles.modalContent}>
                {selectedMessage?.message_type === "text" && (
                  <TouchableOpacity
                    onPress={() => {
                      Clipboard.setString(selectedMessage.message);
                      closeActionModal();
                    }}
                  >
                    <Text style={styles.modalOption}>📋 Copy</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("Forward coming soon");
                    closeActionModal();
                  }}
                >
                  <Text style={styles.modalOption}>📤 Forward</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("React coming soon");
                    closeActionModal();
                  }}
                >
                  <Text style={styles.modalOption}>😊 React</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const userId = auth().currentUser.uid;

                      const messageRef = firestore()
                        .collection("chats")
                        .doc(chatRoomId)
                        .collection("messages")
                        .doc(selectedMessage.id);

                      await messageRef.update({
                        [`deleted.${userId}`]: true,
                      });

                      const messagesSnapshot = await firestore()
                        .collection("chats")
                        .doc(chatRoomId)
                        .collection("messages")
                        .orderBy("message_time", "desc")
                        .get();

                      let updatedLastMessage = null;
                      for (const doc of messagesSnapshot.docs) {
                        const msg = doc.data();
                        if (!msg.deleted || !msg.deleted[userId]) {
                          updatedLastMessage = {
                            sender: msg.sender,
                            time: msg.message_time,
                            message:
                              msg.message_type === "text"
                                ? msg.message
                                : msg.message_type === "image"
                                ? "📷 Image"
                                : "🎥 Video",
                          };
                          break;
                        }
                      }

                      const chatDocRef = firestore().collection("chats").doc(chatRoomId);
                      await chatDocRef.update({
                        [`lastMessagePerUser.${userId}`]: updatedLastMessage || firestore.FieldValue.delete(),
                      });

                      Alert.alert("Deleted for you");
                    } catch (err) {
                      Alert.alert("Error", "Could not delete");
                    }
                    closeActionModal();
                  }}
                >
                  <Text style={styles.modalOption}>🗑️ Delete for me</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const messageRef = firestore()
                        .collection("chats")
                        .doc(chatRoomId)
                        .collection("messages")
                        .doc(selectedMessage.id);

                      await messageRef.delete();

                      const messagesSnapshot = await firestore()
                        .collection("chats")
                        .doc(chatRoomId)
                        .collection("messages")
                        .orderBy("message_time", "desc")
                        .limit(1)
                        .get();

                      const lastMsg = messagesSnapshot.docs[0]?.data();
                      const chatDocRef = firestore().collection("chats").doc(chatRoomId);

                      if (lastMsg) {
                        await chatDocRef.update({
                          lastMessage: {
                            sender: lastMsg.sender,
                            time: lastMsg.message_time,
                            message:
                              lastMsg.message_type === "text"
                                ? lastMsg.message
                                : lastMsg.message_type === "image"
                                ? "📷 Image"
                                : "🎥 Video",
                          },
                        });
                      } else {
                        await chatDocRef.update({
                          lastMessage: firestore.FieldValue.delete(),
                        });
                      }

                      Alert.alert("Deleted for everyone");
                    } catch (err) {
                      Alert.alert("Error", "Could not delete for everyone");
                    }
                    closeActionModal();
                  }}
                >
                  <Text style={[styles.modalOption, { color: "red" }]}>
                    ❌ Delete for everyone
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ paddingBottom: 10 }}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {displayedMessages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg.message}
                time={
                  msg.isTypingPlaceholder
                    ? ""
                    : msg.message_time?.toDate
                    ? formatTime(msg.message_time.toDate())
                    : "Sending..."
                }
                isSent={msg.sender === currentUser}
                isGroupChat={isGroupChat}
                senderName={msg.name}
                onLongPress={() => handleLongPress(msg, msg.id)}
              />
            ))}
          </ScrollView>
        </View>

        <SendMessageContainer chatRoomId={chatRoomId} isGroupChat={isGroupChat} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: height * 0.3,
    position: "absolute",
    zIndex: -1,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: height * 0.08,
    paddingTop: 20,
    justifyContent: "flex-end",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalOption: {
    padding: 10,
    fontSize: 16,
  },
});
