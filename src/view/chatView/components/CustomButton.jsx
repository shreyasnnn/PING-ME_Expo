import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CustomButton({Icon}) {
  return (
    <View style={styles.container}>
        {Icon}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        width: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
        backgroundColor: '#041E49',
      },
})