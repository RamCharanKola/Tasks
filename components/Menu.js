import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer } from "react-native-drawer-layout";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MenuScreen from "../screens/MenuScreen";
import HomeScreen from "../screens/HomeScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import StatusScreen from "../screens/StatusScreen";
import ReportsScreen from "../screens/ReportsScreen";

// const [open, setOpen] = React.useState(false);

const ReactDrawerNavigation = createDrawerNavigator();

// export function DrawerReactNative() {
//   return (
//     <Drawer
//       open={open}
//       onOpen={() => setOpen(true)}
//       onClose={() => setOpen(false)}
//       renderDrawerContent={() => {
//         return <Text>Drawer content</Text>;
//       }}
//     >
//       <Button
//         onPress={() => setOpen((prevOpen) => !prevOpen)}
//         title={`${open ? "Close" : "Open"} drawer`}
//       />
//     </Drawer>
//   );
// }

function DrawBar() {

    return (

  <ReactDrawerNavigation.Navigator initialRouteName="Menu">
    <ReactDrawerNavigation.Screen name="Memu" component={MenuScreen} />
    <ReactDrawerNavigation.Screen
      name="Home"
      component={HomeScreen} 
    />
    <ReactDrawerNavigation.Screen
      name="Registration"
      component={RegistrationScreen} 
    />
    <ReactDrawerNavigation.Screen name="Status" component={StatusScreen} />
    <ReactDrawerNavigation.Screen name="Reports" component={ReportsScreen} />

  </ReactDrawerNavigation.Navigator>
    )
}

export default DrawBar;
