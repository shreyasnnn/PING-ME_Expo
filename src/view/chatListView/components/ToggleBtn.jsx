import { StyleSheet, View } from 'react-native';
import ChatIcon from '../../../../assets/options/ChatIcon';
import GroupIcon from '../../../../assets/options/GroupIcon';

export default function ToggleBtn({ isActive, isChat }) {
  return (
    <View style={[styles.icon, isActive ? styles.active : styles.inActive]}>
      {isChat ? (
        <ChatIcon height={30} width={30} strokeColor={isActive ? 'white' : 'black'} />
      ) : (
        <GroupIcon height={30} width={30} strokeColor={isActive ? 'white' : 'black'} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingVertical: 8,
    paddingHorizontal:24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21,
  },
  active: {
    backgroundColor: '#041E49',
    borderRadius: 21
  },
  inActive:{
    backgroundColor: '',
  }
});
