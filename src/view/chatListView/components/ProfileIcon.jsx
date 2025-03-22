import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export default function AccountName() {
    const [accountName , setAccountName] = useState('DN')
  return (
    <View style={styles.container}>
      <Text style={{color: '#fff'}}>{accountName}</Text>
    </View>
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