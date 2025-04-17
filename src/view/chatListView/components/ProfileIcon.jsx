import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function AccountName() {
  const [accountName, setAccountName] = useState('U');

  GoogleSignin.configure({
    webClientId: '1050971238885-et6rrvtvejvkfgrps0aa2bnfmj4rh6tq.apps.googleusercontent.com',
  });

  useEffect(() => {
    const user = auth().currentUser;
    if (user?.displayName) {
      const initials = getInitials(user.displayName);
      setAccountName(initials);
    }
  }, []);

  const getInitials = (fullName) => {
    if (!fullName) return 'AC';
  
    const words = fullName.trim().split(' ').filter(Boolean);
  
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return 'AC';
    }
  };
  const handleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      Alert.alert('Signed Out', 'You have been signed out successfully.');
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Sign Out Error', error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSignOut}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>{accountName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#041E49',
  },
});
