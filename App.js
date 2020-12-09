import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './components/SplashScreen'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import UsersScreen from './components/UsersScreen'
import RoomDoor from './components/RoomDoor'
import HomeScreen from './components/HomeScreen'
import RoomScreen from './components/RoomScreen'
import SocketDemoPage from './components/SocketDemoPage';
import KickedScreen from './components/KickedScreen'
import CreateRoomScreen from './components/CreateRoom/Screen';

import { styles } from './styles/styles'

import io from 'socket.io-client';
import * as GLOBAL from './state/global';

import { firebase } from '@react-native-firebase/auth';
import { firebaseConfig } from './config/firebaseConfig';
import config from './config/config'

 firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

function App() {
  // Initialize the roomServiceSocket if it isn't already initialized.
  // This will initialize it throughout the entire app.
  if (!GLOBAL.roomServiceSocket) {
    GLOBAL.roomServiceSocket = io(config.SOCKET_URL, { path: config.ROOM_SERVICE_SOCKET });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
      >
        
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
        <Stack.Screen name="RoomScreen" component={RoomScreen} />
        <Stack.Screen name="RoomDoor" component={RoomDoor} />
        <Stack.Screen name="UsersScreen" component={UsersScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="SocketDemoPage" component={SocketDemoPage} />
        <Stack.Screen name="KickedScreen" component={KickedScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
