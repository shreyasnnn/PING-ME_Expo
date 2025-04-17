import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import UserSelectableItem from "./UserSelectableItem";
import BackArrowIcon from "@/assets/options/BackArrowIcon";

const { height } = Dimensions.get("window");

export default function CreateGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const currentUser = auth().currentUser;
      const snapshot = await firestore().collection("users").get();
      const filtered = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.id !== currentUser.uid);
      setUsers(filtered);
    };
    fetchUsers();
  }, []);

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const createGroup = async () => {
    const currentUser = auth().currentUser;
    const memberIds = [currentUser.uid, ...selectedUsers];

    const groupDoc = await firestore().collection("chats").add({
      isGroup: true,
      groupName: groupName,
      members: memberIds,
      createdBy: currentUser.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    navigation.navigate("ChatView", {
      chatRoomId: groupDoc.id,
      isGroupChat: true,
      contact: { name: groupName },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ImageBackground
          source={require("../../../../assets/Backgroud-image.jpg")}
          style={styles.header}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <BackArrowIcon height={24} width={24} fillColor="white" strokeColor="black" />
            </TouchableOpacity>
            <Text style={styles.heading}>Create New Group</Text>
            <TextInput
              placeholder="Enter Group Name"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={groupName}
              onChangeText={setGroupName}
            />
          </View>
        </ImageBackground>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <UserSelectableItem
              user={item}
              isSelected={selectedUsers.includes(item.id)}
              onPress={() => toggleSelectUser(item.id)}
            />
          )}
        />

        <TouchableOpacity
          onPress={createGroup}
          disabled={!groupName || selectedUsers.length === 0}
          style={[
            styles.createButton,
            (!groupName || selectedUsers.length === 0) && styles.disabledButton,
          ]}
        >
          <Text style={styles.createButtonText}>Create Group</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  header: {
    height: height * 0.22,
    paddingBottom: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    paddingHorizontal: 20,
    zIndex: 2,
  },
  backButton: {
    position: "absolute",
    top: 12,       // Reduced top margin
    left: 12,      // Reduced left margin
    backgroundColor: "#fff",
    padding: 6,    // Smaller padding for minimal look
    borderRadius: 18,
    zIndex: 3,
    marginBottom: 30
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    marginTop: 60,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 44,
    fontSize: 16,
    color: "#333",
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  createButton: {
    backgroundColor: "#041E49",
    padding: 14,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
