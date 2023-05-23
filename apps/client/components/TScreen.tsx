import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box } from "../theme";

type Props = {
	children?: React.ReactNode;
	setTopInset?: boolean;
};

const TScreen = ({ children, setTopInset }: Props) => {
	const inset = useSafeAreaInsets();
	return (
		<Box
			style={{
				...styles.screen,
				paddingTop: setTopInset ? inset.top : 0,
			}}
			flex={1}
			backgroundColor="surface"
		>
			{children}
		</Box>
	);
};

export default TScreen;

const styles = StyleSheet.create({
	screen: {},
});
