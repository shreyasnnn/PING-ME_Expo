import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function UserSelectableItem({ user, isSelected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.item, isSelected && styles.selected]}>
      <Text style={styles.name}>{user.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  selected: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  name: {
    fontSize: 16,
  },
});
