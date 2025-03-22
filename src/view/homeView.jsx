import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess(); 
      await GoogleSignin.signOut(); 
      await auth().signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

const homeView = () => {
    const user = auth().currentUser;
  return (
    <View style={styles.container}>
      <Text>Welcome {user?.displayName || 'Guest'} to Home Screen! {user?.email}</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default homeView;