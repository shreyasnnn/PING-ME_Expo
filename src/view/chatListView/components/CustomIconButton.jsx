import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import SearchIcon from '../../../../assets/options/SearchIcon'

export default function SearchIconBtn() {
  return (
    <View>
      <View style={styles.container}>
      <SearchIcon widt={12.03} heigth={12.05} />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width: 36,
        height: 36,
        borderRadius: 36/2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

})