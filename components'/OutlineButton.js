import React, { Children, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function OutlineButton({ onPress, icon, children }) {
  return (
    <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Ionicons style={styles.icon} name={icon} size={30} color={"#036a7f"}>
        <Text style={styles.text}>{children}</Text>
      </Ionicons>
    </Pressable>
  );
}

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    // paddingHorizontal: 12,
    // paddingVertical: 6,
    padding: 10,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2121c4",
    borderWidth: 1,
    flexDirection: 'row',
    flexGrow: 4,
    position: 'relative'
    
  },
  pressed: {
    opacity: 0.7
  },
  icon: {
    marginRight: 6,
    paddingHorizontal: 12,
  },
  text: {
    color: '#4e0d55',
  },
});
