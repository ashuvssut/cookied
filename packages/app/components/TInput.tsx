import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useTheme } from "@shopify/restyle";
import { Box } from "../theme";

type Props = {
	placeholder?: string;
	value: string;
	onChangeText: (text: string) => void;
	autoCorrect?: boolean;
	onBlur?: any;
	type?: string;
};

const TInput = (props: Props) => {
	const theme = useTheme();
	return (
		<Box
			width={{ phone: "100%", largeScreen: "40%" }}
			height={50}
			borderWidth={1}
			borderColor="primary"
			paddingLeft={"s"}
			borderRadius={8}
			marginBottom={{ phone: "m", largePhone: "m" }}
			backgroundColor={"white"}
		>
			<TextInput
				style={{
					flex: 1,
					fontSize: theme.textVariants.body.fontSize,
					color: theme.colors.surface,
					fontFamily: theme.textVariants.body.fontFamily,
					alignItems: "center",
				}}
				{...props}
			/>
		</Box>
	);
};

export default TInput;

const styles = StyleSheet.create({});
