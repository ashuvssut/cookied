import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollViewProps,
	TouchableWithoutFeedback,
} from "react-native";
import { useDripsyTheme, ScrollView } from "dripsy";
import { FCC } from "app/types/IReact";
import { CookiedTheme } from "app/theme/theme";

interface IKeybrdScr {
	keyboardShouldPersistTaps: ScrollViewProps["keyboardShouldPersistTaps"];
	bgColor?: keyof CookiedTheme["colors"];
}

export const KeyboardUsingScreen: FCC<IKeybrdScr> = ({
	children,
	keyboardShouldPersistTaps = "never",
	bgColor = "primary",
}) => {
	const colors = useDripsyTheme().theme.colors;

	// @ts-ignore
	const backgroundColor = colors[bgColor];
	if (!backgroundColor) throw new Error(`No color found for ${bgColor}`);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1, backgroundColor }}
		>
			<TouchableWithoutFeedback
				style={{ flex: 1 }}
				onPress={() => Keyboard.dismiss()}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={{ flex: 1 }}
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps={keyboardShouldPersistTaps}
					// contentInsetAdjustmentBehavior="automatic"
				>
					{children}
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};
