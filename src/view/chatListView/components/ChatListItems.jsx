import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export default function ChatListItems({contact}) {
  return (
    <View key={contact.uid} style={styles.contactContainer}>
      <View style={styles.img_name}>
        <View
          style={{
            backgroundColor: '#E7E7E7',
            borderRadius: 12,
            overflow: 'hidden',
          }}>
          <Image
            source={{
              uri: contact.imageUrl,
            }}
            style={styles.img}
          />
        </View>
        <View style={styles.txt}>
          <Text style={{color: '#041E49', fontWeight: 400, fontSize: 14}}>
            {contact.name}
          </Text>
          <Text style={{color: '#444746', fontWeight: 400, fontSize: 10}}>
            Done
          </Text>
        </View>
      </View>
      <View style={styles.time_unseen}>
        <Text style={{color: '#444746', fontWeight: 400, fontSize: 12}}>
          {contact.time}
        </Text>
        <View style={styles.unseen}>
          <Text style={{color: '#fff'}}>99+</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contactContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 26,
    paddingVertical: 6,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 12,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  img_name: {
    flexDirection: 'row',
  },
  txt: {
    flexDirection: 'colum',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingBottom: 2,
    alignItems: 'flex-start',
  },
  time_unseen: {
    alignItems: 'flex-end',
  },
  unseen: {
    backgroundColor: '#041E49',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 6,
  },
});
