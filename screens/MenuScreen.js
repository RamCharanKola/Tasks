import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Button
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StatusScreen from "./StatusScreen";
import DrawBar from "../components/Menu";


// const navigation = useNavigation();

//  useEffect(() => {
//     navigation.setOptions({
//       headerLargeTitle: true,
//       headerTitle: "Home",
//       headerRight: () => (
//         <TouchableOpacity
//           onPress={() => navigation.navigate("Stacks")}
//           style={{
//             backgroundColor: "purple",
//             width: 30,
//             height: 30,
//             borderRadius: 10,
//             justifyContent: "center",
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 20,
//               textAlign: "center",
//               color: "white",
//             }}
//           >
//             +
//           </Text>
//         </TouchableOpacity>
//       ),
//       headerSearchBarOptions: {
//         placeholder: "Friends",
//         onChangeText: (event) => {
//           searchFilterFunction(event.nativeEvent.text);
//         },
//       },
//     });
//   }, [navigation]);

const MenuScreen = () => {
  return (
      <View>
        {/* <MyStack /> */}
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          marginTop: "20%",
        }}
      >
        Memu Screen
      </Text>
    </View>
  );
};
 
export default MenuScreen;