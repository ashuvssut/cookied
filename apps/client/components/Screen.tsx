import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box } from "../theme/theme";

type Props = {
	children?: React.ReactNode;
	setTopInset?: boolean;
};

const Screen = ({ children, setTopInset }: Props) => {
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

export default Screen;

const styles = StyleSheet.create({
	screen: {},
});
