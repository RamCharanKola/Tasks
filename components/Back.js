import {Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/MenuScreen';

const Stack = createNativeStackNavigator();

export default function Back() {
  return (

    <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#fff"
          />
        ),
      }}
    />
  </Stack.Navigator>
    
    // <Stack.Navigator>
    //   <Stack.Screen name="Home" component={Home} />
    //   <Stack.Screen name="Notifications" component={Notifications} />
    //   <Stack.Screen name="Profile" component={Profile} />
    //   <Stack.Screen name="Settings" component={Settings} />
    // </Stack.Navigator>
  );
}