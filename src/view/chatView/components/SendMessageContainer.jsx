import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import AttachMessageIcon from '../../../../assets/options/AttachMessageIcon';
import SendIcon from '../../../../assets/options/SendIcon';
import CustomButton from './CustomButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export default function SendMessageContainer({chatRoomId}) {

  const sendMessage = async (chatRoomId, message, messageType) => {
    try {
      const sender = auth().currentUser.uid; // Get the current user's ID
      if (!chatRoomId || !message || !sender) {
        throw new Error("Missing required fields");
      }
  
      const messageTime = Date.now(); // Get current time in milliseconds
      const messageId = `${new Date().toISOString()}_${messageTime}`; // Unique message ID
  
      await firestore()
        .collection("chats")
        .doc(chatRoomId)
        .collection("messages")
        .doc(messageId)
        .set({
          message,
          sender,
          message_type: messageType || "text",
          message_id: messageId,
          message_time: messageTime,
        });
  
      // ✅ Update the last message in chat document
      await firestore().collection("chats").doc(chatRoomId).update({
        lastMessage: {
          sender,
          time: messageTime,
          message,
        },
      });
  
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  return (
    <View style={styles.sendMsgContainer}>
      <CustomButton Icon={<AttachMessageIcon height={24} width={24} fillColor='#041E49' strokeColor='#fff'/>}/>
      <View>
        <TextInput
          style={{
            borderColor: '#d9d9d9',
            borderWidth: 1,
            flex: 1,
            borderRadius: 25,
            backgroundColor: '#fff',
            fontSize: 16,
            paddingLeft: 24,
            paddingVertical: 15,
            paddingRight: 95,
          }}
          placeholder="Type a message..."
          placeholderTextColor={'#444746'}
        />
      </View>
      <CustomButton Icon={<SendIcon height={20} width={20} strokeColor='white' fillColor='#041E49'  />} handleOnPress={()=>{sendMessage(chatRoomId,"shreyas","text")}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  sendMsgContainer: {
    position: 'absolute',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginBottom: 42,
    flexDirection: 'row',
    zIndex: 10,
    backgroundColor: 'shadow',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  }
});
