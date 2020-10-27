import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import test from './components/test'
import SplashScreen from './components/SplashScreen'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import { styles } from './styles/styles'

// function HomeScreen({ navigation }) {
//   return (
//     <View style={styles.center}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Test"
//         onPress={() => navigation.navigate('test')}
//       />
//     </View>
//   );
// }

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="test" component={test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
