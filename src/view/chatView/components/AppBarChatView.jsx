import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import BackArrowIcon from '../../../../assets/options/BackArrowIcon';
import Menu from '../../../../assets/options/Menu';

const getStatusText = (status) => {
  if (!status) return "";
  if (status.online) return "Online";
  if (status.lastSeen) {
    const lastSeenDate = status.lastSeen.toDate();
    return `Last seen at ${lastSeenDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  return ""; // nothing if no info
};

const AppBarChatView = ({ contact, contactStatus, onBackPress, onMorePress }) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
    }}>
      <TouchableOpacity
        onPress={onBackPress}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          height: 36,
          width: 36,
          borderRadius: 18,
        }}>
        <BackArrowIcon height={36} width={36} fillColor="white" />
      </TouchableOpacity>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
        flex: 1,
      }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: '#E7E7E7',
          overflow: 'hidden'
        }}>
          <Image
            source={{ uri: contact.profileImage }}
            style={{ width: 40, height: 40, borderRadius: 12 }}
          />
        </View>
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
            {contact.name}
          </Text>
          <Text style={{ fontSize: 12, color: 'white' }}>
            {getStatusText(contactStatus)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onMorePress}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          height: 30,
          width: 30,
          borderRadius: 20,
        }}>
        <Menu width={4} height={16} fillColor={'#041E49'} />
      </TouchableOpacity>
    </View>
  );
};

export default AppBarChatView;