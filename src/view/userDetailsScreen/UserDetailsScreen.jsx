import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import CustomInputField from './component/CustomInputField';
import ProfileImage from './component/ProfileImage';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function UserDetailsScreen() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setIsButtonActive(name.trim() !== '' && nickname.trim() !== '');
  }, [name, nickname]);

  const handleSignOut = async () => {
    try{
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
    }
    catch (error) {
      console.error("Sign out error:", error);
      Alert.alert("Sign Out Error", "Failed to sign out.");
    }
  };
  // const uploadImageToFirebase = async (uri) => {
  //   try {
  //     const user = auth().currentUser;
  //     if (!user) {
  //       return '';
  //     }

  //     const response = await fetch(uri);
  //     const blob = await response.blob(); // Convert to Blob

  //     const fileName = `profile_pictures/${user.uid}.jpg`;
  //     const reference = storage().ref(fileName);
  //     await reference.put(blob); // Upload as a Blob
  //     const imageUrl = await reference.getDownloadURL();

  //     return imageUrl;
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     Alert.alert("Upload Error", "Failed to upload image.");
  //     return '';
  //   }
  // };

  const handleSave = async () => {
    const user = auth().currentUser;
    if (!user) {
      return;
    }

    let imageUrl = '';
    // if (profileImage) {
    //   imageUrl = await uploadImageToFirebase(profileImage);
    // }

    try {
      await firestore().collection('users').doc(user.uid).set({
        userId: user.uid,
        email: user.email,
        name: name.trim(),
        nickname: nickname.trim(),
        profileImage: imageUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    navigation.replace('ChatListView');
      

    } catch (error) {
      console.error("Firestore Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ProfileImage profileImage={profileImage} setProfileImage={setProfileImage} />
      <CustomInputField inputText={name} setInputText={setName} hintText="Enter Full Name" />
      <CustomInputField inputText={nickname} setInputText={setNickname} hintText="Enter Nickname" />
      <CustomInputField inputText={mobile} setInputText={setMobile} hintText="Enter Mobile Number" />
      
      <View style={styles.buttonContainer}>
        <Button title="Save Profile" onPress={handleSave} disabled={!isButtonActive} />
        <Button title="Sign out" onPress={handleSignOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '90%',
  },
});
