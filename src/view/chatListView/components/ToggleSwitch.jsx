import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ToggleBtn from './ToggleBtn';

export default function ToogleSwitch({isChatSelected, setIsChatSelected}) {

  return (
    <View style={styles.toggleWrapper}>
      <TouchableOpacity onPress={() => setIsChatSelected(true)}>
        <ToggleBtn isActive={isChatSelected} isChat={true} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsChatSelected(false)}>
        <ToggleBtn isActive={!isChatSelected} isChat={false} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleWrapper: {
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 21,
    flexDirection: 'row',
    overflow: 'hidden'
  },
});
