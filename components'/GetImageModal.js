import React from "react";
import { Modal, Pressable, View, Text } from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
    launchImageLibraryAsync,
    MediaTypeOptions,
    CameraType,
  } from "expo-image-picker";

export default GetImageModal = ({ isVisible, children, onClose, onPress }) => {
    const [cameraPermissionInformation, requestPermission] = React.useState();
    const [capturedImage, setCapturedImage] = React.useState();
    const verifyPermissions = async () => {

    }
    const capturedImageHandler = async () => {

    }
  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={{width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#25292e', position: 'absolute'}}>
        <View >
          <Pressable onPress={onPress}>
            <MaterialCommunityIcons
              name="camera-image"
              size={24}
              color="black"
            />
            <Text>{}</Text>
          </Pressable>
          <Pressable onPress={onClose}>
          <Entypo name="images" size={24} color="black" />
            <Text>{}</Text>
          </Pressable>
        </View>
        <View>
        <Pressable onPress={onPress}>
          <Entypo name="images" size={24} color="black" />
            <Text style={{fontSize: 20, }}>Close</Text>
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
};
