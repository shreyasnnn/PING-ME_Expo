import {
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
  Easing,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ChatListItems from "./ChatListItems";
import firestore, { collectionGroup } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const { height } = Dimensions.get("window");

export default function ContactList({ isSearchActive, navigation }) {
  const [contacts, setContacts] = useState([]); // ✅ State to store fetched users
  const animatedTop = useRef(new Animated.Value(height * 0.15)).current;


  const createOrGetChatRoom = async (contact) => {
    const currentUser = auth().currentUser;
    if (!currentUser) return null;
    console.log(`Current user ID: ${contact.userId}`);
    const chatRoomId =
      currentUser.uid < contact.userId
        ? `${currentUser.uid}_${contact.userId}`
        : `${contact.userId}_${currentUser.uid}`;
  
    try {
      const chatRoomRef = firestore().collection("chats").doc(chatRoomId);
      const chatRoomSnapshot = await chatRoomRef.get();
      console.log(`${chatRoomId} chat room snapshot:`, chatRoomSnapshot.exists);
      if (!chatRoomSnapshot.exists) {
        await chatRoomRef.set({
          user1: {
            id: currentUser.uid,
            name: currentUser.displayName,
            profileImage: currentUser.photoURL || "",
          },
          user2: {
            id: contact.userId,
            name: contact.name,
            profileImage: contact.imageUrl || "",
          },
          lastMessage: {
            senderId: "",
            time: null,
            message: "",
          },
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }
      navigation.navigate("ChatView", {
        contact,chatRoomId})
      return chatRoomId;
    } catch (error) {
      console.error("Error creating chat room:", error);
      return null;
    }
  };

  useEffect(() => {
    // ✅ Fetch users from Firestore
    const fetchUsers = async () => {
      const currentUser = auth().currentUser;
      if (!currentUser) return;

      try {
        const usersSnapshot = await firestore()
          .collection("users")
          .get();

        const usersList = usersSnapshot.docs
          .map((doc) => ({
            userId: doc.id,
            name: doc.data().name,
            imageUrl: doc.data().profileImage || "https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp", // ✅ Default image
            recentMsg: doc.data().recentMessage || "No recent messages",
          }))
          .filter((user) => user.userId !== currentUser.uid); // ✅ Exclude logged-in user

        setContacts(usersList); // ✅ Update state with users list
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    Animated.timing(animatedTop, {
      toValue: isSearchActive ? height * 0.23 : height * 0.14,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isSearchActive]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: animatedTop,
          height: height - (isSearchActive ? height * 0.23 : height * 0.14),
        },
      ]}
    >
      <ScrollView scrollEnabled={true} style={{ paddingTop: 16 }}>
        {contacts.map((contact) => (
          <Pressable
            key={contact.userId} // ✅ Prevent React key error
            onPress={() => {createOrGetChatRoom(contact)}}
          >
            <ChatListItems contact={contact} />
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    zIndex: 1,
  },
});
