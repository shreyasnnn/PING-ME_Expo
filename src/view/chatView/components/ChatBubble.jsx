import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ChatBubble({
  message,
  time,
  isSent,
  isGroupChat,
  senderName,
  onLongPress
}) {
  const bubbleStyle = isSent ? styles.sentBubble : styles.receivedBubble;
  const textStyle = isSent ? styles.sentText : styles.receivedText;

  const isTyping = message?.toLowerCase()?.includes("typing...");

  return (
    <View style={[styles.bubbleContainer, isSent ? styles.alignRight : styles.alignLeft]}>
    {!isSent && isGroupChat && senderName && !isTyping && (
      <Text style={styles.senderName}>{senderName}</Text>
    )}

    <TouchableOpacity
      onLongPress={onLongPress}
      activeOpacity={0.8}
      style={[styles.bubble, bubbleStyle, isTyping && styles.typingBubble]}
    >
      <Text style={[styles.messageText, textStyle]}>{message}</Text>
      {!isTyping && <Text style={styles.timeText}>{time}</Text>}
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    marginVertical: 6,
    marginHorizontal: 10,
    maxWidth: "75%",
  },
  alignRight: {
    alignSelf: "flex-end",
  },
  alignLeft: {
    alignSelf: "flex-start",
  },
  senderName: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
    marginLeft: 4,
  },
  bubble: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sentBubble: {
    backgroundColor: "#041E49",
  },
  receivedBubble: {
    backgroundColor: "#F4F4F5",
  },
  typingBubble: {
    backgroundColor: "#E0E0E0",
    fontStyle: "italic",
  },
  messageText: {
    fontSize: 16,
  },
  sentText: {
    color: "#fff",
  },
  receivedText: {
    color: "#000",
  },
  timeText: {
    fontSize: 10,
    color: "#999",
    alignSelf: "flex-end",
    marginTop: 4,
  },
});
