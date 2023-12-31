import { FCC } from "app/types/IReact";
import { Text, TextInput, Pressable, View, useDripsyTheme } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import { ComponentProps } from "react";
import { StyleSheet } from "react-native";

const _TextInput = (props: ComponentProps<typeof TextInput>) => {
	const placeholder = useDripsyTheme().theme.colors.placeholder;
	return (
		// @ts-ignore
		<TextInput
			variant={"layout.textInput" as any}
			placeholderTextColor={placeholder as any}
			sx={{ color: "onPrimary" }}
			{...props}
		/>
	);
};

type PressableProps = ComponentProps<typeof Pressable>;
const _ButtonPrimary: FCC<PressableProps> = props => {
	const linearGradients = useDripsyTheme().theme.linearGradients;
	const color = props.disabled ? "onInactive" : "onPrimary";
	return (
		<Pressable {...props} style={ss.pressable}>
			<LinearGradient
				colors={
					props.disabled
						? linearGradients.disabledButtonBg
						: linearGradients.primaryButtonBg
				}
				start={[0, 0.5]}
				end={[1, 0.5]}
				style={{ height: "100%", width: "100%", position: "absolute" }}
			/>
			<View variant="layout.buttonContainer">
				<Text sx={{ textAlign: "center", color }}>{props.children}</Text>
			</View>
		</Pressable>
	);
};

const _ButtonSecondary: FCC<PressableProps> = props => {
	const color = props.disabled ? "onInactive" : "onPrimary";
	return (
		<Pressable
			{...props}
			style={[
				{ borderColor: "#777", borderWidth: 2, borderStyle: "solid" },
				ss.pressable,
			]}
		>
			<View variant="layout.buttonContainer">
				<Text sx={{ textAlign: "center", color }}>{props.children}</Text>
			</View>
		</Pressable>
	);
};

export const Th = () => null;
Th.TextInput = _TextInput;
Th.ButtonPrimary = _ButtonPrimary;
Th.ButtonSecondary = _ButtonSecondary;

const ss = StyleSheet.create({
	pressable: {
		overflow: "hidden",
		borderRadius: 4,
		marginBottom: 4,
		justifyContent: "center",
		alignItems: "center",
		maxHeight: 50,
		marginTop: 16,
	},
});
