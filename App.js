// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer, useNavigation } from "@react-navigation/native";
 
// //screens
// import HomeScreen from "./screens/HomeScreen";
// import SettingsScreen from "./screens/SettingsScreen";
// import StackScreen from "./screens/StackScreen";
 
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import WelcomeScreen from "./screens/WelcomeScreen";
// import RegistrationScreen from "./screens/RegistrationScreen";
 
// const HomeStackNavigator = createNativeStackNavigator();
 
// function MyStack() {
//   return (
//     <HomeStackNavigator.Navigator initialRouteName="HomeScreen">
//       <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} />
//       <HomeStackNavigator.Screen
//         name="Welcome"
//         component={WelcomeScreen}
//         options={{
//           headerBackTitleVisible: false,
//         }}
//       />
//       <HomeStackNavigator.Screen
//         name="Stack"
//         component={StackScreen}
//         options={{
//           headerBackTitleVisible: false,
//         }}
//       />
//     </HomeStackNavigator.Navigator>
//   );
// }
 
// const Tab = createBottomTabNavigator();
 
// function MyTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         tabBarActiveTintColor: "purple",
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={MyStack}
//         options={{
//           tabBarLabel: "Feed",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={30} />
//           ),
//           tabBarBadge: 10,
//           headerShown: false,
//         }}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{
//           tabBarLabel: "Settings",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons
//               name="brightness-5"
//               color={color}
//               size={30}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
 
// export default function Navigation() {
//   return (
//     <NavigationContainer>
      
//       <MyTabs />
//       {/* <Stack.Navigator>
//         <Stack.Screen
//           name="Welcome"
//           component={WelcomeScreen}
//           options={{title: 'Welcome'}}
//         />
//         <Stack.Screen name="Registration" component={RegistrationScreen} />
//       </Stack.Navigator> */}
//     </NavigationContainer>
//   );
// }

import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigation } from 'react-native-navigation';
import Tabs from './components/Tabs';
import DrawBar from './components/Menu';
import RegistrationScreen from './screens/HomeScreen';
import HomeScreen from './screens/MenuScreen';
import Back from './components/Back';

// export function registerScreens() {
//   Navigation.registerComponent(
//     'Menu',
//     () => gestureHandlerRootHOC(DrawBar),
//     () => DrawBar
//   );
//   Navigation.registerComponent(
//     'example.SecondTabScreen',
//     () => gestureHandlerRootHOC(SecondTabScreen),
//     () => SecondTabScreen
//   );
//   Navigation.registerComponent(
//     'example.PushedScreen',
//     () => gestureHandlerRootHOC(PushedScreen),
//     () => PushedScreen
//   );
// }

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Tabs /> */}
      <DrawBar />
    </NavigationContainer>
  );
}