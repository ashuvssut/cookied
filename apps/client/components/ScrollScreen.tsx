import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box } from "../theme";

type Props = {
	children?: React.ReactNode;
	setTopInset?: boolean;
	justifyCenter?: boolean;
	alignCenter?: boolean;
};

const ScrollScreen = ({
	children,
	setTopInset,
	justifyCenter,
	alignCenter,
}: Props) => {
	const inset = useSafeAreaInsets();
	const { height } = useWindowDimensions();
	return (
		<ScrollView style={{ ...styles.screen }}>
			<Box
				flex={1}
				style={{
					paddingTop: setTopInset ? inset.top : 0,
					minHeight: setTopInset ? height + inset.top : height,
				}}
				backgroundColor={"surface"}
			>
				{children}
			</Box>
		</ScrollView>
	);
};

export default ScrollScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
