import { StyleSheet } from "react-native";
import { Text, View } from "dripsy";
import React from "react";

type Props = {
	title: string;
};

const ActionModal = (props: Props) => {
	return (
		<View>
			<Text sx={{ color: "black", height: [200] }}>ActionModal</Text>
		</View>
	);
};

export default ActionModal;

const styles = StyleSheet.create({});
