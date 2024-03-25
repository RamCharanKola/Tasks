import React from "react";
import { View, Text, Modal } from "react-native";
 
const ReportsScreen = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          marginTop: "20%",
        }}
      >
        Reports Screen
      </Text>
      {/* <Modal
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
      </Modal> */}
    </View>
  );
};
 
export default ReportsScreen;