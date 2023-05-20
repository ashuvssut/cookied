import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginScreen from "../../screens/LoginScreen";// index file used to avoid repetative import (for ex:- /LoginScren/LoginScreen)

type Props = {};

const Login = (props: Props) => {
	return <LoginScreen />;
};

export default Login;

const styles = StyleSheet.create({});
