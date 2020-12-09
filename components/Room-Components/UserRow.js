import React from 'react';
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';
import * as GLOBAL from '../../state/global';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '@react-native-firebase/auth';

const kickUser = async (user) => {
  GLOBAL.roomServiceSocket.emit('kick_user', {
    roomID: GLOBAL.roomName,
    user,
    authToken: await firebase.auth().currentUser.getIdToken()
  });
  console.log(`kicking: ${GLOBAL.roomName}, ${user.nickname}`);
}

const UserRow = ({ user, hasVoted, isHost }) => {
  const canKick = (firebase.auth().currentUser.displayName === GLOBAL.roomName);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Icon
          name={(hasVoted) ? 'check-circle' : 'check-circle-outline'}
          size={40}
          color='rgb(34, 52, 150)'
        />
        <Text style={styles.nickname}>
          {user.nickname}
        </Text>
        {
          isHost &&
          <Icon
            name='star'
            color='gold'
            size={30}
            style={styles.badge}
          />
        }
      </View>
      {
        canKick &&
        <Pressable
          onPress={() => kickUser(user)}
          style={styles.kickButton}
        >
          <Icon
            name='exit-to-app'
            size={40}
            color='rgb(34, 52, 150)'
          />
        </Pressable>
      }
    </View>
  );
};

// This should probably be imported from somewhere.
const baseFontFamily = 'ReemKufi-Regular';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nickname: {
    fontFamily: baseFontFamily,
    fontWeight: 'normal',
    fontSize: 35,
    marginLeft: 10,
    textAlign: 'center',
    overflow: 'hidden'
  },
  badge: {
    marginLeft: 3
  },
  kickButton: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default UserRow;
