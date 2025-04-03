import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function AccountName() {
    const [accountName , setAccountName] = useState('DN')
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
  return (
    <TouchableOpacity style={styles.container} onPress={handleSignOut}>
      <Text style={{color: '#fff'}}>{accountName}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        height: 36,
        width: 36,
        borderRadius: 36/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#041E49'
    }
})