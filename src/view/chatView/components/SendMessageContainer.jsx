import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import AttachMessageIcon from '../../../../assets/options/AttachMessageIcon';
import SendIcon from '../../../../assets/options/SendIcon';
import CustomButton from './CustomButton';

export default function SendMessageContainer() {
  return (
    <View style={styles.sendMsgContainer}>
      <CustomButton Icon={<AttachMessageIcon height={24} width={24} fillColor='#041E49' strokeColor='#fff'/>}/>
      <View>
        <TextInput
          style={{
            borderColor: '#d9d9d9',
            borderWidth: 1,
            flex: 1,
            borderRadius: 25,
            backgroundColor: '#fff',
            fontSize: 16,
            paddingLeft: 24,
            paddingVertical: 15,
            paddingRight: 95,
          }}
          placeholder="Type a message..."
          placeholderTextColor={'#444746'}
        />
      </View>
      <CustomButton Icon={<SendIcon height={20} width={20} strokeColor='white' fillColor='#041E49' />}/>
    </View>
  );
}

const styles = StyleSheet.create({
  sendMsgContainer: {
    position: 'absolute',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginBottom: 42,
    flexDirection: 'row',
    zIndex: 10,
    backgroundColor: 'shadow',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  }
});
