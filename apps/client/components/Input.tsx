import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useTheme } from "@shopify/restyle";
import { Box } from "../theme";

type Props = {};

const Input = (props: Props) => {
	const theme = useTheme();
	return (
		<Box
			width={"80%"}
			height={"10%"}
			borderWidth={1}
			borderColor="primary"
			borderRadius={5}
			// padding="s"
			marginBottom={{ phone: "m", largePhone: "m" }}
		>
			<TextInput
				style={{
					fontSize: theme.textVariants.body.fontSize,
					color: theme.colors.text,
					fontFamily: theme.textVariants.body.fontFamily,
				}}
				{...props}
			/>
		</Box>
	);
};

export default Input;

const styles = StyleSheet.create({});
