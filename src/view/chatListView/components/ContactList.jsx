// Import as before
import {
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
  Easing,
  Pressable,
  View,
  Text,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ChatListItems from './ChatListItems';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export default function ContactList({ isSearchActive, isChatSelected, navigation, searchQuery  }) {
  const [contacts, setContacts] = useState([]);
  const [typingStatus, setTypingStatus] = useState({});
  const animatedTop = useRef(new Animated.Value(height * 0.15)).current;
  const isFocused = useIsFocused();

  const currentUser = auth().currentUser;

  useEffect(() => {
    const unsubscribeTypingListeners = [];

    const addTypingListener = (chatRoomId, isGroup, userId) => {
      const typingRef = isGroup
        ? firestore().collection('groupChats').doc(chatRoomId)
        : firestore().collection('chats').doc(chatRoomId);

      const unsubscribe = typingRef.onSnapshot((doc) => {
        const data = doc.data();
        const typingField = isGroup
          ? data?.typingUsers?.filter(id => id !== currentUser.uid)
          : data?.isTyping && data?.typingUser !== currentUser.uid;

        setTypingStatus((prev) => ({
          ...prev,
          [chatRoomId]: typingField && typingField.length > 0 ? 'Typing...' : '',
        }));
      });

      unsubscribeTypingListeners.push(unsubscribe);
    };

    const fetchContacts = async () => {
      if (!currentUser) return;

      try {
        const usersSnapshot = await firestore().collection("users").get();
        const groupsSnapshot = await firestore().collection("groupChats").get();

        const usersList = await Promise.all(
          usersSnapshot.docs
            .filter((doc) => doc.id !== currentUser.uid)
            .map(async (doc) => {
              const userData = doc.data();
              const chatRoomId =
                currentUser.uid < doc.id
                  ? `${currentUser.uid}_${doc.id}`
                  : `${doc.id}_${currentUser.uid}`;
              const chatDoc = await firestore().collection("chats").doc(chatRoomId).get();
              const chatData = chatDoc.data();

              addTypingListener(chatRoomId, false, doc.id);

              return {
                userId: doc.id,
                name: userData.name,
                imageUrl: userData.profileImage || "https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp",
                lastMessage: chatData?.lastMessage?.message || "No messages yet",
                lastMessageTime: chatData?.lastMessage?.time?.toDate() || null,
                unseenCount: chatData?.unseenCounts?.[currentUser.uid] || 0,
                lastMessageSender: chatData?.lastMessage?.sender || "",
                isGroup: false,
                chatRoomId,
              };
            })
        );

        const groupsList = await Promise.all(
          groupsSnapshot.docs.map(async (doc) => {
            const groupData = doc.data();

            addTypingListener(doc.id, true);

            return {
              groupId: doc.id,
              name: groupData.groupName,
              imageUrl: groupData.groupImage || "https://cdn-icons-png.flaticon.com/512/74/74472.png",
              lastMessage: groupData?.lastMessage?.message || "No messages yet",
              lastMessageTime: groupData?.lastMessage?.time?.toDate() || null,
              unseenCount: groupData?.unseenCounts?.[currentUser.uid] || 0,
              lastMessageSender: groupData?.lastMessage?.sender || "",
              isGroup: true,
              chatRoomId: doc.id,
            };
          })
        );

        const combinedContacts = [...usersList, ...groupsList];
        combinedContacts.sort(
          (a, b) => (b.lastMessageTime?.getTime() || 0) - (a.lastMessageTime?.getTime() || 0)
        );

        setContacts(combinedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();

    return () => {
      unsubscribeTypingListeners.forEach(unsub => unsub());
    };
  }, [isFocused]);

  useEffect(() => {
    Animated.timing(animatedTop, {
      toValue: isSearchActive ? height * 0.23 : height * 0.14,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isSearchActive]);

  const createOrGetChatRoom = async (contact) => {
    if (!currentUser) return null;

    try {
      if (contact.isGroup) {
        navigation.navigate("ChatView", {
          contact,
          chatRoomId: contact.groupId,
          isGroupChat: true,
        });
        return;
      } else {
        const chatRoomId = contact.chatRoomId;

        const chatRoomRef = firestore().collection("chats").doc(chatRoomId);
        const chatRoomSnapshot = await chatRoomRef.get();

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
            members: [currentUser.uid, contact.userId],
            lastMessage: {
              sender: "",
              time: null,
              message: "",
            },
            unseenCounts: {
              [currentUser.uid]: 0,
              [contact.userId]: 0,
            },
            createdAt: firestore.FieldValue.serverTimestamp(),
            isGroup: false,
          });
        }

        navigation.navigate("ChatView", {
          contact,
          chatRoomId,
          isGroupChat: false,
        });
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {!isChatSelected ? (
        <View>
          <Pressable
            style={styles.createGroupButton}
            onPress={() => navigation.navigate("CreateGroupScreen")}
          >
            <Text style={styles.createGroupText}>+ Create Group</Text>
          </Pressable>
          <ScrollView style={{ paddingTop: 16 }}>
            {filteredContacts
              .filter((c) => c.isGroup)
              .map((contact) => (
                <Pressable
                  key={contact.groupId}
                  onPress={() => createOrGetChatRoom(contact)}
                >
                  <ChatListItems
                    contact={contact}
                    currentUserId={currentUser.uid}
                    typingStatus={typingStatus[contact.chatRoomId]}
                  />
                </Pressable>
              ))}
          </ScrollView>
        </View>
      ) : (
        <ScrollView style={{ paddingTop: 16 }}>
          {filteredContacts
            .filter((c) => !c.isGroup)
            .map((contact) => (
              <Pressable
                key={contact.userId}
                onPress={() => createOrGetChatRoom(contact)}
              >
                <ChatListItems
                  contact={contact}
                  currentUserId={currentUser.uid}
                  typingStatus={typingStatus[contact.chatRoomId] || ""}
                />
              </Pressable>
            ))}
        </ScrollView>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    zIndex: 1,
  },
  createGroupButton: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  createGroupText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
});
