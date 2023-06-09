import { FCC } from "app/types/IReact";
import { Text, TextInput, Pressable, View, useDripsyTheme } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import { ComponentProps, FC } from "react";
import { StyleSheet, TextInputProps } from "react-native";

const _TextInput = (props: TextInputProps) => {
	const placeholder = useDripsyTheme().theme.colors.placeholder;
	return (
		// @ts-ignore
		<TextInput
			variant={"layout.textInput" as any}
			placeholderTextColor={placeholder as any}
			style={{ color: "white" }}
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
	// TODO will add to theme later
	// const linearGradients = useDripsyTheme().theme.linearGradients;
	const color = props.disabled ? "onInactive" : "onPrimary";
	return (
		<Pressable {...props} style={ss.pressable}>
			<LinearGradient
				colors={['#414141','#000000']}
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

const _IconButton: FC<PressableProps> = ({ children, sx, ...props }) => {
	const { secondary } = useDripsyTheme().theme.colors;
	return (
		<Pressable
			sx={{
				p: "$2",
				flex: 1,
				borderWidth: 1,
				borderRadius: 5,
				userSelect: "none",
				...sx,
			}}
			style={({ pressed, hovered }) => {
				let backgroundColor = hovered ? "#333" : "#0000";
				backgroundColor = pressed ? secondary : backgroundColor;
				return { backgroundColor, borderColor: pressed ? "#444" : "#0000" };
			}}
			{...props}
		>
			{children}
		</Pressable>
	);
};

export const Th = () => null;
Th.TextInput = _TextInput;
Th.ButtonPrimary = _ButtonPrimary;
Th.ButtonSecondary = _ButtonSecondary;
Th.IconButton = _IconButton;

const ss = StyleSheet.create({
	pressable: {
		overflow: "hidden",
		borderRadius: 4,
		marginBottom: 4,
		justifyContent: "center",
		alignItems: "center",
		maxHeight:50,
		marginTop: 16,
	},
});
