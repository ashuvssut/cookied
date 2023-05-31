import { StyleSheet, Text, View } from "react-native";
import React from "react";

import TScreen from "../../components/TScreen";
import { TText } from "../../theme";

type Props = {};

const LoadingScreen = (props: Props) => {
	return (
		<TScreen setTopInset>
			<TText color="text">LoadingScreen</TText>
		</TScreen>
	);
};

export default LoadingScreen;

const styles = StyleSheet.create({});
