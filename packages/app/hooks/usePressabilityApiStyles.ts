import { useDripsyTheme } from "dripsy";
import { PressableStateCallbackType, StyleProp, ViewStyle } from "react-native";

export function usePressabilityApiStyles():
	| StyleProp<ViewStyle>
	| ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) {
	const { primary, secondary } = useDripsyTheme().theme.colors;
	return ({ pressed, hovered }) => {
		let backgroundColor = !!hovered ? "#333" : primary;
		backgroundColor = pressed ? secondary : backgroundColor;
		return {
			backgroundColor,
			borderColor: pressed || hovered ? "#444" : "#0000",
		};
	};
}
