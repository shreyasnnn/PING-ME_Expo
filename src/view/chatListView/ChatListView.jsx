import { AppState, ImageBackground, StyleSheet, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Options from './components/Options';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function ChatListView({ navigation }) {
  const [isChatSelected, setIsChatSelected] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { height } = Dimensions.get('window');

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    const userRef = firestore().collection('users').doc(currentUser.uid);

    const setUserOnline = async () => {
      await userRef.update({ online: true });
    };

    const setUserOffline = async () => {
      await userRef.update({
        online: false,
        lastSeen: firestore.FieldValue.serverTimestamp(),
      });
    };

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        setUserOnline();
      } else if (nextAppState.match(/inactive|background/)) {
        setUserOffline();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Set online when this effect mounts
    setUserOnline();

    return () => {
      subscription.remove();
      setUserOffline(); // Optional cleanup
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/Backgroud-image.jpg')}
        resizeMode="cover"
        style={{
          width: '100%',
          height: height * 0.3,
          position: 'absolute',
          zIndex: -1,
        }}
      >
        <Options
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
          isChatSelected={isChatSelected}
          setIsChatSelected={setIsChatSelected}
        />
        <SearchBar
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </ImageBackground>

      <ContactList
        isSearchActive={isSearchActive}
        navigation={navigation}
        isChatSelected={isChatSelected}
        searchQuery={searchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({});