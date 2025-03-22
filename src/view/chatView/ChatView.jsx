import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
import AppBarChatView from './components/AppBarChatView';
import {useRoute} from '@react-navigation/native';
import ChatBubble from './components/ChatBubble';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import SendMessageContainer from './components/SendMessageContainer';
import LinearGradient from 'react-native-linear-gradient';


const messages = [
  {
    message: 'Hey, how are you?',
    time: '10:30 AM',
    isSent: true,
  },
  {
    message: "I'm good! How about you?",
    time: '10:31 AM',
    isSent: false,
  },
  {
    message: "I'm doing great! What’s up?",
    time: '10:32 AM',
    isSent: true,
  },
  {
    message: 'Nothing much, just working on a project.',
    time: '10:33 AM',
    isSent: false,
  },
  {
    message: 'Sounds interesting! Tell me more.',
    time: '10:34 AM',
    isSent: true,
  },
  {
    message: "It's a Flutter app for chatting!",
    time: '10:35 AM',
    isSent: false,
  },
  {
    message: 'Nice! Need any help?',
    time: '10:36 AM',
    isSent: true,
  },
  {
    message: 'That would be awesome!',
    time: '10:37 AM',
    isSent: false,
  },
  {
    message: 'Sure! What feature are you working on?',
    time: '10:38 AM',
    isSent: true,
  },
  {
    message: "I'm trying to implement real-time messaging.",
    time: '10:39 AM',
    isSent: false,
  },
  {
    message: 'Are you using Firebase for that?',
    time: '10:40 AM',
    isSent: true,
  },
  {
    message: "Yes, but I'm facing an issue with Firestore queries.",
    time: '10:41 AM',
    isSent: false,
  },
  {
    message: "I can help! What's the issue?",
    time: '10:42 AM',
    isSent: true,
  },
  {
    message: 'Messages are not appearing in the correct order.',
    time: '10:43 AM',
    isSent: false,
  },
  {
    message: 'Try ordering by timestamp in your query.',
    time: '10:44 AM',
    isSent: true,
  },
  {
    message: 'Good idea! Let me try that.',
    time: '10:45 AM',
    isSent: false,
  },
  {
    message: 'Cool! Let me know if you need more help.',
    time: '10:46 AM',
    isSent: true,
  },
  {
    message: 'Thanks! It worked! 🎉',
    time: '10:47 AM',
    isSent: false,
  },
  {
    message: 'Awesome! Now you can move on to the next feature. 🚀',
    time: '10:48 AM',
    isSent: true,
  },
  {
    message: 'Yeah! Maybe adding voice messages next.',
    time: '10:49 AM',
    isSent: false,
  },
  {
    message: 'That would be a great addition! 🔥',
    time: '10:50 AM',
    isSent: true,
  },
];

const {height, width} = Dimensions.get('window');
export default function ChatView({route, navigation}) {
  const {contact} = route.params;
  return (
    <View>
      <ImageBackground
        source={require('../../../assets/Backgroud-image.jpg')}
        resizeMode="cover"
        style={{
          width: '100%',
          height: height * 0.3,
          position: 'absolute',
          zIndex: -1,
        }}>
        <AppBarChatView
          contact={contact}
          onBackPress={() => {
            navigation.goBack();
          }}
          onMorePress={() => {}}
        />
      </ImageBackground>
      <View
        style={[
          styles.container,
          {width: '100%', height: height - height * 0.08},
        ]}>
        <ScrollView>
          {messages.map(msg => (
            <ChatBubble
              // key = {index}
              message={msg.message}
              time={msg.time}
              isSent={msg.isSent}
            />
          ))}
        </ScrollView>
        <SendMessageContainer />
      <LinearGradient
        colors={['transparent', 'white']}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 0,
          right: 0,
          height: 80, // Adjust height as needed
        }}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    zIndex: 1,
    top: height * 0.08,
    paddingTop: 20,
    justifyContent: 'flex-end',
  },
});
