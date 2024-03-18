import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
// import * as DocumentPicker from 'react-native-document-picker';
// import DocumentScanner from 'react-native-document-scanner-plugin';

import React, { useEffect, useState } from "react";

import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
  CameraType,
} from "expo-image-picker";

import * as Location from "expo-location";

export default function App() {
  const [docPicker, setDocPicker] = useState();
  const [docPickerSize, setDocPickerSize] = useState();
  const options = {
    type: ["application/pdf"], // Allow only PDF files
    // copyToCacheDirectory: true, // Copy the picked file to the cache directory
    accessibilityLabel: "Select PDF Document", // Accessibility label for the picker
  };
  async function docPickerHandler() {
    const docPicked = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      // multiple: true
    });
    console.log(docPicked);
    if (docPicked.canceled) {
      return;
    } else {
      setDocPicker(docPicked.assets[0].name);
      setDocPickerSize(docPicked.assets[0].size);
      console.log("docPickerSize", docPickerSize);
    }
    // setDocPicker(docPicked.assets[0].uri);
    // setDocPicker(docPicked.assets[0].name);
  }

  /* 
  --------------------
   Image Capturing STARTING
   ------------------
   */

  const [capturedImage, setCapturedImage] = React.useState();
  const [capturedImageSize, setCapturedImageSize] = React.useState();

  const [permissionInformation, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (permissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (permissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );

      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      // allowsEditing: true, // if allowsEditing is mentioned as true, then captured image can be Edited and croped --- "allowsEditing: true "
      cameraType: CameraType.front,
      quality: 1,
      // base64: true
    });

    // setPackedImage(image.assets[0].uri);
    if (!image.canceled) {
      setCapturedImage(image.assets[0].uri);
      setCapturedImageSize(image.assets[0].filesize);
      getLocationHandler();
    }

    if (image.canceled) return;

    console.log("Captured image", image);
    console.log(image.assets[0].filesize, "image size");
  }

  /* 
   --------------------
    Image Picker END 
    ------------------
    */

  const [image, setImage] = React.useState(null);
  const [pickedImageSize, setPickedImageSize] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      // allowsEditing: true,
    });
    console.log("Picked Image", result);

    console.log("Picked Image Size", result.assets[0].filesize);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPickedImageSize(result.assets[0].filesize);
      getLocationHandler();
    }
  };

  const [locationLatitude, setLocationLatitude] = useState(null);
  const [locationLongituge, setLocationLongitude] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  async function getLocationHandler() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("LOCATION    ", location);
    setLocationLatitude(location.coords.altitude);
    setLocationLongitude(location.coords.longitude);
  }

  // const [details, setDetails] = React.useState([]);
  const [name, setName] = React.useState();
  const [courseName, setCourseName] = React.useState();
  const [feePaid, setFeePaid] = React.useState();
  const [rollNumber, setRollNumber] = React.useState();
  const [mobileNumber, setMobileNumber] = React.useState();
  const [emailId, setEmailId] = React.useState();
  const [clgName, setClgName] = React.useState();
  const [clgCity, setClgCity] = React.useState();

  function nameHandler(name) {
    setName(name);
  }

  function courseNameHandler(courseName) {
    setCourseName(courseName);
  }

  function feePaidHandler(feePaid) {
    setFeePaid(feePaid);
  }

  function rollNumberHandler(rollNumber) {
    setRollNumber(rollNumber);
  }

  function mobileNumberHandler(mobileNumber) {
    setMobileNumber(mobileNumber);
  }
  function emailIdHandler(emailId) {
    setEmailId(emailId);
  }

  function clgNameHandler(clgName) {
    setClgName(clgName);
  }
  function clgCityHandler(clgCity) {
    setClgCity(clgCity);
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [history, setHistory] = useState(false);

  function historyHandler() {
    setHistory(true);
    console.log(
      name,
      courseName,
      rollNumber,
      mobileNumber,
      emailId,
      clgName,
      clgCity
    );
  }

  return (
    <ScrollView>
      <StatusBar backgroundColor="#dbd2d3" style="light" />
      <View style={[styles.container, { marginTop: 20 }]}>
        <View style={{ marginTop: 30 }}>
          <TextInput
            onChangeText={nameHandler}
            style={{
              borderWidth: 2,
              borderColor: "blue",
              margin: 10,
              borderRadius: 8,
              padding: 6,
              fontSize: 20,
            }}
            focusable
            placeholderTextColor={"red"}
            placeholder="Enter your Name"
          />
          <TextInput
            onChangeText={courseNameHandler}
            style={{
              borderWidth: 2,
              borderColor: "blue",
              margin: 10,
              borderRadius: 8,
              padding: 6,
              fontSize: 20,
            }}
            focusable
            placeholderTextColor={"red"}
            placeholder="Enter your Course Name"
          />
          <TextInput
            onChangeText={feePaidHandler}
            style={{
              borderWidth: 2,
              borderColor: "blue",
              margin: 10,
              borderRadius: 8,
              padding: 6,
              fontSize: 20,
            }}
            keyboardType="number-pad"
            focusable
            placeholderTextColor={"red"}
            placeholder="Enter Total Fee Paid"
          />
          <TextInput
            onChangeText={rollNumberHandler}
            style={{
              borderWidth: 2,
              borderColor: "blue",
              margin: 10,
              borderRadius: 8,
              padding: 6,
              fontSize: 20,
            }}
            focusable
            placeholderTextColor={"red"}
            placeholder="Enter your Roll Number"
          />
          <TextInput
            onChangeText={mobileNumberHandler}
            style={{
              borderWidth: 2,
              borderColor: "blue",
              margin: 10,
              borderRadius: 8,
              padding: 6,
              fontSize: 20,
            }}
            focusable
            placeholderTextColor={"red"}
            placeholder="Enter your Mobile Number"
          />
          <TextInput
            onChangeText={emailIdHandler}
            style={{
              borderWidth: 2,
              borderColor: "blue",
              margin: 10,
              borderRadius: 8,
              padding: 6,
              fontSize: 20,
            }}
            focusable
            placeholderTextColor={"red"}
            placeholder="Enter your Email ID"
          />
          <TextInput
            onChangeText={clgNameHandler}
            style={{
              borderWidth: 2,
              borderColor: "blue",
              margin: 10,
              borderRadius: 8,
              padding: 6,
              fontSize: 20,
            }}
            focusable
            placeholderTextColor={"red"}
            placeholder="Enter your College Name"
          />
          <TextInput
            onChangeText={clgCityHandler}
            style={{
              borderWidth: 2,
              borderColor: "blue",
              margin: 10,
              borderRadius: 8,
              padding: 6,
              fontSize: 20,
            }}
            focusable
            placeholderTextColor={"red"}
            placeholder="Enter your College City"
          />
        </View>
        <View style={{ margin: 20 }}>
          <Button title="Upload you fee receipt" onPress={docPickerHandler} />
          {docPicker && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{ fontWeight: 800, color: "#f8012a", fontWeight: 700 }}
                >
                  Document Uploaded :
                </Text>
                <Text style={{ color: "blue" }}>{docPicker}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{ fontWeight: 800, color: "#f8012a", fontWeight: 700 }}
                >
                  Document Uploaded Size:
                </Text>
                <Text style={{ color: "blue" }}>
                  {docPickerSize / 1000 >= 1000
                    ? docPickerSize / 1000000 + " MB"
                    : docPickerSize / 1000 + " KB"}{" "}
                </Text>
              </View>
            </>
          )}
        </View>
        <View
          style={{
            margin: 20,
          }}
        >
          <Button title="Upload image from Gallery" onPress={pickImage} />
          {image && (
            <>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={{ margin: 20, width: 200, height: 200 }}
                />
                <View
                  style={{ flexDirection: "column", justifyContent: "center" }}
                >
                  <Text style={{ color: "#f8012a", fontWeight: 700 }}>
                    Geo-Coordinates:{" "}
                  </Text>
                  <Text style={{ color: "blue" }}>{locationLatitude}</Text>
                  <Text style={{ color: "blue" }}>{locationLongituge} </Text>
                  <Text style={{ color: "#f8012a", fontWeight: 700 }}>
                    Pickeded Image Size:{" "}
                  </Text>
                  <Text style={{ color: "blue" }}>
                    {pickedImageSize / 1000 >= 1000
                      ? pickedImageSize / 1000000 + " MB"
                      : pickedImageSize / 1000 + " KB"}{" "}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
        <Text style={{ fontSize: 30, fontWeight: 700, margin: 10 }}>or</Text>
        <View style={{ margin: 20 }}>
          <Button title="Take Selfie" onPress={takeImageHandler} />
          {capturedImage && (
            <>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  source={{ uri: capturedImage }}
                  style={{ margin: 20, width: 200, height: 200 }}
                />
                <View
                  style={{ flexDirection: "column", justifyContent: "center" }}
                >
                  <Text style={{ color: "#f8012a", fontWeight: 700 }}>
                    Geo-Coordinates:{" "}
                  </Text>
                  <Text style={{ color: "blue" }}>{locationLatitude}</Text>
                  <Text style={{ color: "blue" }}>{locationLongituge} </Text>
                  <Text style={{ color: "#f8012a", fontWeight: 700 }}>
                    Captured Image Size:{" "}
                  </Text>
                  <Text style={{ color: "blue" }}>
                    {capturedImageSize / 1000}{" "}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
      <View style={{ margin: 20 }}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Student Reports</Text>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <Text style={{ margin: 10, color: "#fd0101", fontWeight: "900", fontSize: 30 }}>
                Student Report
              </Text>
            <View style={{alignItems: 'flex-start'}}>
              {
                capturedImage && (
                  <Image style={{borderRadius: 200, width: 200, height: 200}} source={{uri: capturedImage}} />
                )
              }
              <View style={{ marginTop: 15, flexDirection: "row" }}>
                <Text style={{ color: "#6dff05" }}>Student Name : </Text>
                <Text style={styles.modalText}>{name}</Text>
              </View>
              <View style={{ margin: 2, flexDirection: "row" }}>
                <Text style={{ color: "#6dff05" }}>Course Name : </Text>
                <Text style={styles.modalText}>{courseName}</Text>
              </View>
              <View style={{ margin: 2, flexDirection: "row" }}>
                <Text style={{ color: "#6dff05" }}>Fee Paid : </Text>
                <Text style={styles.modalText}>{feePaid}</Text>
              </View>
              <View style={{ margin: 2, flexDirection: "row" }}>
                <Text style={{ color: "#6dff05" }}>Roll Number : </Text>
                <Text style={styles.modalText}>{rollNumber}</Text>
              </View>
              <View style={{ margin: 2, flexDirection: "row" }}>
                <Text style={{ color: "#6dff05" }}>Mobile Number : </Text>
                <Text style={styles.modalText}>{mobileNumber}</Text>
              </View>
              <View style={{ margin: 2, flexDirection: "row" }}>
                <Text style={{ color: "#6dff05" }}>Email ID : </Text>
                <Text style={styles.modalText}>{emailId}</Text>
              </View>
              <View style={{ margin: 2, flexDirection: "row" }}>
                <Text style={{ color: "#6dff05" }}>College Name : </Text>
                <Text style={styles.modalText}>{clgName}</Text>
              </View>
              <View style={{ margin: 2, flexDirection: "row" }}>
                <Text style={{ color: "#6dff05" }}>College City Name : </Text>
                <Text style={styles.modalText}>{clgCity}</Text>
              </View>
              <View style={{ margin: 2, flexDirection: "row" }}>
                <Text style={{ color: "#6dff05" }}>
                  Uploaded Fee Receipt Name :{" "}
                </Text>
                <Text style={styles.modalText}>{docPicker}</Text>
              </View>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#af06fdd7",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
