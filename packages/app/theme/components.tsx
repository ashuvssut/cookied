import { FCC } from "app/types/IReact";
import { Text, TextInput, View, styled, useDripsyTheme } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, PressableProps } from "react-native";

const _Pressable = props => (
	<Pressable
		hitSlop={30}
		style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
		{...props}
	/>
);

const _TextInput = props => {
	const colors = useDripsyTheme().theme.colors;
	return (
		<TextInput
			variant="layout.textInput"
			placeholderTextColor={colors.placeholder}
			{...props}
		/>
	);
};

const ButtonPrimary: FCC<PressableProps> = props => {
	const linearGradients = useDripsyTheme().theme.linearGradients;
	if (props.disabled) {
		return (
			<_Pressable {...props} style={{ overflow: "hidden", borderRadius: 5 }}>
				<LinearGradient
					colors={linearGradients.disabledButtonBg}
					start={[0, 0.5]}
					end={[1, 0.5]}
					style={{ height: "100%", width: "100%", position: "absolute" }}
				/>
				<View variant="layout.buttonContainer">
					<Text sx={{ textAlign: "center" }}>{props.children}</Text>
				</View>
			</_Pressable>
		);
	}
	return (
		<_Pressable {...props} style={{ overflow: "hidden", borderRadius: 5 }}>
			<LinearGradient
				colors={linearGradients.primaryButtonBg}
				start={[0, 0.5]}
				end={[1, 0.5]}
				style={{ height: "100%", width: "100%", position: "absolute" }}
			/>
			<View variant="layout.buttonContainer">
				<Text sx={{ textAlign: "center" }}>{props.children}</Text>
			</View>
		</_Pressable>
	);
};

export const Th = () => null;
Th.Pressable = styled(_Pressable)({});
Th.TextInput = _TextInput;
Th.ButtonPrimary = ButtonPrimary;
