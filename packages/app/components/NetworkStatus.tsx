import React from "react";
import {useNetInfo} from "@react-native-community/netinfo";
import {View, Text, StyleSheet} from "react-native";

const NetworkStatus = () => {
  const netInfo = useNetInfo();

  if (netInfo.isConnected) {
    return null; // No need to show the message if there is an internet connection
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NetworkStatus;
