import {
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
  Easing,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import ChatListItems from './ChatListItems';

const {height, width} = Dimensions.get('window');
export default function ContactList({isSearchActive, navigation}) {
  const contacts = [
    {
      uid: 1,
      name: 'BA GURU NOTES TAGO',
      imageUrl:'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      recentMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 2,
      name: 'Amma',
      imageUrl: 'https://i.postimg.cc/g0PzxvBM/profilei-Img.png',
      subMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 3,
      name: 'Baba',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      subMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 4,
      name: 'Akka ❤',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      subMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 5,
      name: 'Pradhyumna Mit',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      subMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 6,
      name: 'Rajath Mit',
      imageUrl: '',
      subMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 7,
      name: 'Joel Sunny',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      subMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 8,
      name: 'Dsouza💕',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      subMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 9,
      name: 'Golu',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      subMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 10,
      name: 'Reddy',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      subMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 11,
      name: 'BA GURU NOTES TAGO',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      recentMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 12,
      name: 'BA GURU NOTES TAGO',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      recentMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 13,
      name: 'BA GURU NOTES TAGO',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      recentMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 14,
      name: 'BA GURU NOTES TAGO',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      recentMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 15,
      name: 'BA GURU NOTES TAGO',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      recentMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 16,
      name: 'BA GURU NOTES TAGO',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      recentMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 17,
      name: 'BA GURU NOTES TAGO',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      recentMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 18,
      name: 'BA GURU NOTES TAGO',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      recentMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
    {
      uid: 19,
      name: 'BA GURU NOTES TAGO',
      imageUrl:
        'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp',
      recentMsg: 'You: EVS Re test Question Bank...',
      time: '15:15',
      unseenMsgNumber: '1',
    },
  ];

  const animatedTop = useRef(new Animated.Value(height * 0.15)).current;

  useEffect(() => {
    Animated.timing(animatedTop, {
      toValue: isSearchActive ? height * 0.23 : height * 0.14,
      duration: 400, // Smooth transition duration
      easing: Easing.inOut(Easing.ease), // ease-in-out effect
      useNativeDriver: false, // Because we're animating a layout property (top)
    }).start();
  }, [isSearchActive]); //Animation effect when searchBar states changes

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: animatedTop,
          height: height - (isSearchActive ? height * 0.23 : height * 0.14),
        },
      ]}>
      <ScrollView scrollEnabled={true} style={{paddingTop: 16}}>
        {contacts.map(contact => (
          <Pressable
            onPress={() => navigation.navigate('ChatView', {contact: contact})}>
            <ChatListItems contact={contact} />
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    zIndex: 1,
  },
});
