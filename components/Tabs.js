import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ReportsScreen from '../screens/ReportsScreen';
import MenuScreen from '../screens/MenuScreen';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
       <Tab.Screen
        name="Home" 
        component={MenuScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
          tabBarBadge: 10,
          headerShown: false,
        }}
      />
      {/* <Tab.Screen 
      options={{
        tabBarLabel: "Registration",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="file-document-multiple" color={color} size={30} />
        ),
        tabBarBadge: 10,
        headerShown: false,
      }}
      name="Registration" 
      component={RegistrationScreen} /> */}
      <Tab.Screen 
      options={{
        tabBarLabel: "Reports",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="file-document-multiple" color={color} size={30} />
        ),
        tabBarBadge: 10,
        headerShown: false,
      }}
      name="Reports" 
      component={ReportsScreen} />
    </Tab.Navigator>
  );
}

export default Tabs;