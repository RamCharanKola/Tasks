import React, { useEffect, useState } from "react";
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
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as ImageManupulator from 'expo-image-manipulator';

// import * as DocumentPicker from 'react-native-document-picker';
// import DocumentScanner from 'react-native-document-scanner-plugin';

import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
  CameraType,
} from "expo-image-picker";

import * as Location from "expo-location";
import GetImageModal from "./components/GetImageModal";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadImageModalVisible, setUploadIMageModal] = useState(false);

  /* 
  --------------------
   Document Picker STARTING
   ------------------
   */

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
  }

   /* 
  --------------------
   Document Picker END
   ------------------
   */

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
      let permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (permissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app.",
        [
          {
            text: 'Allow',
            onPress: async () => {
              await requestPermission()
            }
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},    
        ]
      );

      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    setUploadIMageModal(false)
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

    if (!image.canceled) {
      setCapturedImage(image.assets[0].uri);
      setCapturedImageSize(image.assets[0].filesize);
      getLocationHandler();
      setImage(null);
    }

    if (image.canceled) return;

    console.log("Captured image ", image);
    console.log(image.assets[0].filesize, "image size");
  }

  /* 
   --------------------
    Image Capturing END 
    ------------------
    */


    /*

          Image Picker  --------- ****  Starting **** ----------------

*/

  const [image, setImage] = React.useState(null);
  const [pickedImageSize, setPickedImageSize] = React.useState(null);

  var pickedImageToHtml = ''

  const pickImage = async () => {
    setUploadIMageModal(false)
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      // allowsEditing: true,
    });
    console.log("Picked Image", result);
    const splitPickedImage = result.assets[0].uri.split('/');
    const last = splitPickedImage.length-1;
    pickedImageToHtml =  splitPickedImage[last];
    console.log("Picked Image after split", splitPickedImage[last]);
    console.log("Picked Image Size", result.assets[0].filesize);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPickedImageSize(result.assets[0].filesize);
      getLocationHandler();
      setCapturedImage('');
    }
  };

  /*

       Image Picker    --------- ****  End **** ----------------

*/

 /*

       Location Picker    --------- ****  Starting **** ----------------

*/

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

   /*

       Location Picker    --------- ****  End **** ----------------

*/


/*

INPUT VALUES HANDLING  --------- ****  Starting **** ----------------

*/
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

  /*

INPUT VALUES HANDLING    --------- ****  End **** ----------------

*/

  
  const [history, setHistory] = useState(false);

   /*

       Social share & Html to Image    --------- ****  Starting **** ----------------

*/

// <img
    // src=${pickedImageToHtml}
    //    width: "100", height: "100" />
    //    <p>${pickedImageToHtml}</p>
  const html = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center; justify-content: center; align-items: center;">
    <div style="width: 100%; height: 100%; border: 3px solid blue; border-radius: 20px; background-color: #cb83a5e6;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal; color:#c01632">
      STUDENT
    </h1>
      <p style="font-size: 50px; color: #342160;;">Student Name: <span style="color: #9652f0;">${name}</span></p>
      <p style="font-size: 50px; color: #342160;">Course Name: <span style="color: #9652f0;">${courseName}</p>
      <p style="font-size: 50px; color: #342160">Fee Paid: <span style="color: #9652f0;">${feePaid}</span></p>
      <p style="font-size: 50px; color: #342160">Roll Number: <span style="color: #9652f0;">${rollNumber}</span></p>
      <p style="font-size: 50px; color: #342160">Mobile Number: <span style="color: #9652f0;">${mobileNumber}</span></p>
      <p style="font-size: 50px; color: #342160">Email ID: <span style="color: #9652f0;">${emailId}</span></p>
      <p style="font-size: 50px; color: #342160">College: <span style="color: #9652f0;">${clgName}</span></p>
      <p style="font-size: 50px; color: #342160">College City: <span style="color: #9652f0;">${clgCity}</span></p>
      </div>
    </div>
  </body>
</html>
`;

const print = async () => {
  await Print.printAsync({
    html,
  });
};

const printToFile = async () => {
  const { uri } = await Print.printToFileAsync({ html });
  console.log("File has been saved to:", uri);
  await Sharing.shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
};

/*

       Social Share & Html to Image    --------- ****  End **** ----------------

*/

/* 
  --------------------
   Image Manipulator STARTING
   ------------------
   */


   const imageManupulator = async () => {
    const manipulator = await ImageManupulator.manipulateAsync(
      (image? image: capturedImage),
      [{flip: ImageManupulator.FlipType.Vertical}]
      );
      console.log('imageManupulator ', manipulator);
      (image? setImage(manipulator.uri): setCapturedImage(manipulator.uri))
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
                  flexDirection: "column",
                  gap: 6,
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
                  Document Uploaded Size:{" "}
                </Text>
                <Text style={{ color: "blue" }}>
                  {docPickerSize / 1000 >= 1000
                    ? docPickerSize / 1000000 + " MB"
                    : docPickerSize / 1000 + " KB"}
                </Text>
              </View>
            </>
          )}
        </View>
        <View>
          <Button
            title="Upload Your Image"
            onPress={() => setUploadIMageModal(true)}
          />
        </View>
        <View style={{ margin: 20 }}>
              {image ? (
                <>
                 <View
                      style={{
                        alignItems: 'center'
                      }}
                      >
                      <Text style={{color: '#fd0202', fontSize: 20, fontWeight: '600', }}>Profile Picture</Text>
                      </View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Pressable onPress={imageManupulator}>
                    <Image
                      source={{ uri: image }}
                      style={{ margin: 20, width: 200, height: 200 }}
                    />
                    </Pressable>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {
                        locationLatitude ? (
                          <>
                      <Text style={{ color: "#f8012a", fontWeight: 700 }}>
                        Geo-Coordinates:
                      </Text>
                      <Text style={{ color: "blue" }}>{locationLatitude}</Text>
                      <Text style={{ color: "blue" }}>
                        {locationLongituge}
                      </Text>
                      <Text style={{ color: "#f8012a", fontWeight: 700 }}>
                        Pickeded Image Size:
                      </Text>
                      <Text style={{ color: "blue" }}>
                        {pickedImageSize / 1000 >= 1000
                          ? pickedImageSize / 1000000 + " MB"
                          : pickedImageSize / 1000 + " KB"}
                      </Text>
                          </>
                        ) : ''
                      }
                    </View>
                  </View>
                </>
              ):
              <View style={{ margin: 20 }}>
              {capturedImage && (
                <>
                      <View
                      style={{
                        alignItems: 'center'
                      }}
                      >
                      <Text style={{color: '#fd0202', fontSize: 20, fontWeight: '600', }}>Profile Picture</Text>
                      </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: 'center'
                    }}
                  >
                    <Pressable onPress={imageManupulator}>
                    <Image
                      source={{ uri: capturedImage }}
                      style={{ margin: 20, width: 200, height: 200 }}
                    />
                    </Pressable>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {
                        locationLatitude ?
                        <>
                      <Text style={{ color: "#f8012a", fontWeight: 700 }}>
                        Geo-Coordinates:
                      </Text>
                      <Text style={{ color: "blue" }}>{locationLatitude}</Text>
                      <Text style={{ color: "blue" }}>
                        {locationLongituge}
                      </Text>
                      <Text style={{ color: "#f8012a", fontWeight: 700 }}>
                        Captured Image Size:
                      </Text>
                      <Text style={{ color: "blue" }}>
                        {capturedImageSize / 100000} MB
                      </Text>
                        </>: ''
                      }
                    </View>
                  </View>
                </>
              )}
              </View>
              }
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
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                margin: 10,
                color: "#fd0101",
                fontWeight: "900",
                fontSize: 30,
              }}
            >
              Student Report
            </Text>
            <View style={{ alignItems: "center" }}>
              {(image? image: capturedImage) && (
                <Image
                  style={{ borderRadius: 200, width: 200, height: 200 }}
                  source={{ uri: (capturedImage? capturedImage: image) }}
                />
              )}
              <View style={{ alignItems: "flex-start" }}>
                <View style={{ marginTop: 15, flexDirection: "row" }}>
                  <Text style={{ color: "#6dff05" }}>Student Name : {" "}</Text>
                  <Text style={styles.modalText}>{name}</Text>
                </View>
                <View style={{ margin: 2, flexDirection: "row" }}>
                  <Text style={{ color: "#6dff05" }}>Course Name : {" "}</Text>
                  <Text style={styles.modalText}>{courseName}</Text>
                </View>
                <View style={{ margin: 2, flexDirection: "row" }}>
                  <Text style={{ color: "#6dff05" }}>Fee Paid :{" "} </Text>
                  <Text style={styles.modalText}>{feePaid}</Text>
                </View>
                <View style={{ margin: 2, flexDirection: "row" }}>
                  <Text style={{ color: "#6dff05" }}>Roll Number : {" "}</Text>
                  <Text style={styles.modalText}>{rollNumber}</Text>
                </View>
                <View style={{ margin: 2, flexDirection: "row" }}>
                  <Text style={{ color: "#6dff05" }}>Mobile Number : {" "}</Text>
                  <Text style={styles.modalText}>{mobileNumber}</Text>
                </View>
                <View style={{ margin: 2, flexDirection: "row" }}>
                  <Text style={{ color: "#6dff05" }}>Email ID : {" "} </Text>
                  <Text style={styles.modalText}>{emailId}</Text>
                </View>
                <View style={{ margin: 2, flexDirection: "row" }}>
                  <Text style={{ color: "#6dff05" }}>College Name : {" "} </Text>
                  <Text style={styles.modalText}>{clgName}</Text>
                </View>
                <View style={{ margin: 2, flexDirection: "row" }}>
                  <Text style={{ color: "#6dff05" }}>College City Name : {" "}</Text>
                  <Text style={styles.modalText}>{clgCity}</Text>
                </View>
                <View style={{ margin: 2, flexDirection: "column" }}>
                  <Text style={{ color: "#6dff05" }}>
                    Uploaded Fee Receipt Name :
                  </Text>
                  <Text style={[styles.modalText,{justifyContent: 'center'}]}>{docPicker}</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={printToFile}
              >
                <Text style={styles.textStyle}>Share as Pdf</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={uploadImageModalVisible}
        >
          <View
            style={[styles.container]}
          >
            <View style={[styles.modalView]}>
            <View
              style={{
                margin: 20,
              }}
            >
              <Button title="Upload image from Gallery" onPress={pickImage} />
            </View>
            <View style={{ margin: 20 }}>
                <Button title="Take Selfie" onPress={takeImageHandler} />
            </View>
            <Button title="Close" onPress={() => setUploadIMageModal(false)} />
            </View>
          </View>
        </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
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
