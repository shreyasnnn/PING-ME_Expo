import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import moment from "moment";

export default function ChatListItems({
  contact,
  currentUserId,
  typingStatus,
}) {
  // console.log("contact:", contact);
  const messageObj =
    typeof contact.lastMessage === "object" ? contact.lastMessage : {};

  const messageText =
    messageObj.message ?? contact.lastMessage ?? "No messages yet";

  const isUnread = contact?.unseenCount > 0;
  const isSentByMe = contact.lastMessageSender === currentUserId;
  const isTyping = typingStatus === "Typing...";

  const displayMessage = isTyping
    ? "typing..."
    : messageText === "" || !messageText
    ? "No messages yet"
    : isSentByMe
    ? `You: ${messageText}`
    : messageText;

  return (
    <View style={styles.contactContainer}>
      <View style={styles.img_name}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: contact.imageUrl }} style={styles.img} />
        </View>
        <View style={styles.txt}>
          <Text style={[styles.name]}>{contact.name}</Text>
          <Text
            style={[
              styles.message,
              isTyping && styles.typingText,
              isUnread && !isTyping && styles.boldText,
            ]}
            numberOfLines={1}
          >
            {isTyping ? "typing..." : displayMessage}
          </Text>
        </View>
      </View>
      <View style={styles.time_unseen}>
        <Text style={styles.time}>
          {contact.lastMessageTime
            ? moment(contact.lastMessageTime).format("HH:mm")
            : ""}
        </Text>
        {!isTyping && isUnread && (
          <View style={styles.unseen}>
            <Text style={styles.unseenText}>{contact.unseenCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
  },
  img_name: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageWrapper: {
    backgroundColor: "#E7E7E7",
    borderRadius: 12,
    overflow: "hidden",
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 12,
    resizeMode: "cover",
  },
  txt: {
    marginLeft: 12,
    justifyContent: "center",
    maxWidth: 180,
  },
  name: {
    color: "#041E49",
    fontWeight: "500",
    fontSize: 14,
  },
  message: {
    color: "#444746",
    fontWeight: "400",
    fontSize: 12,
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  typingText: {
    fontStyle: "italic",
    color: "#2e7d32",
    fontWeight: "500",
  },
  time_unseen: {
    alignItems: "flex-end",
  },
  time: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  unseen: {
    backgroundColor: "#041E49",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  unseenText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
