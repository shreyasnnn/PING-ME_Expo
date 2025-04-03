import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function CustomButton({Icon, handleOnPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
        {Icon}
    </TouchableOpacity>
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