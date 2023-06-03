import { FCC } from "app/types/IReact";
import { Text, TextInput, View, styled, useDripsyTheme } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, PressableProps, StyleSheet } from "react-native";

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
			<Pressable {...props} style={{ overflow: "hidden", borderRadius: 5 }}>
				<LinearGradient
					colors={linearGradients.disabledButtonBg}
					start={[0, 0.5]}
					end={[1, 0.5]}
					style={{ height: "100%", width: "100%", position: "absolute" }}
				/>
				<View variant="layout.buttonContainer">
					<Text sx={{ textAlign: "center" }}>{props.children}</Text>
				</View>
			</Pressable>
		);
	}
	return (
		<Pressable {...props} style={ss.pressable}>
			<LinearGradient
				colors={linearGradients.primaryButtonBg}
				start={[0, 0.5]}
				end={[1, 0.5]}
				style={{ height: "100%", width: "100%", position: "absolute" }}
			/>
			<View variant="layout.buttonContainer">
				<Text sx={{ textAlign: "center" }}>{props.children}</Text>
			</View>
		</Pressable>
	);
};

export const Th = () => null;
Th.Pressable = styled(Pressable)({});
Th.TextInput = _TextInput;
Th.ButtonPrimary = ButtonPrimary;

const ss = StyleSheet.create({
	pressable: {
		overflow: "hidden",
		borderRadius: 5,
		marginBottom: 4,
		marginTop: 20,
	},
});
