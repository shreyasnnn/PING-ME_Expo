import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileImage({ profileImage, setProfileImage }) {
  
  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "You need to allow access to your gallery.");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Allow cropping
      aspect: [1, 1], // Crop to square
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // ✅ Update profile image state
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pickImage}>
      <Image 
        style={styles.image} 
        source={{
          uri: profileImage || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg'
        }} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 250,
    borderRadius: 12,
    marginBottom: 50,
  },
  image: {
    flex: 1,
    resizeMode: 'cover', // Ensures image covers the area
    borderRadius: 12,
    height: 200,
    width: 250,
    overflow: 'hidden',
    backgroundColor: '#d3d3d3',
  },
});
