import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ChatBubble({message, time, isSent}) {
    // const [height,Width]
  return (
    <View style={{flexDirection: 'row',alignItems: 'flex-end',justifyContent: isSent ? 'flex-end':'flex-start',marginHorizontal: 18,paddingVertical: 4}}>
        {isSent && <Text style={styles.time}>
            {time}
        </Text>}
      <View style={{padding: 12,alignSelf: 'flex-start',maxWidth: "65%",backgroundColor: isSent ? '#041E49':'#F4F4F5', borderRadius: 8}}>
        <Text style={{color: isSent ? '#FFFFFF':'#041E49',fontSize: 12,fontWeight: 400}}>
            {message}
        </Text>
      </View>
      {!isSent&&<Text style={styles.time}>
            {time}
      </Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    time:{
        fontSize: 8,
        fontWeight: 400,
        color: '#444746',
        paddingHorizontal: 4
    }
})