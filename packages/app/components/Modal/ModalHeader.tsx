import { MdClose, MdLock } from "app/assets/icons";
import { IconButton } from "app/components/IconButton";
import { TModalType, useModal } from "app/components/Modal/useModal";
import {
	IWebViewRefProps,
	IWebpageState,
} from "app/components/WebView/WebView";
import { View, Text } from "dripsy";
import { Pressable, StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Toast } from "app/components/Toast";
export interface IModalHeaderProps {
	type: TModalType;
	handleClose?: () => void;
	webViewProps: IWebViewRefProps & IWebpageState;
}

export const ModalHeader = ({ webViewProps, ...props }: IModalHeaderProps) => {
	async function copyUrl() {
		try {
			await Clipboard.setStringAsync(webViewProps.url);
			Toast.success("URL copied to Clipboard!");
		} catch (err: any) {
			const msg = err.message || err.toString();
			console.error(msg);
			Toast.error(`Error: Could not copy URL. ${msg}`);
		}
	}
	if (props.type === "web-view") {
		const secureColor = webViewProps.secured ? "#31a14c" : "#5a6266";
		return (
			<View style={ss.header}>
				<CloseModalButton onPress={props.handleClose} />
				<Pressable onLongPress={copyUrl}>
					<View
						variant="layout.row"
						sx={{
							flex: 1,
							justifyContent: "center",
							gap: 5,
							alignItems: "center",
						}}
					>
						{webViewProps.secured && <MdLock color={secureColor} size={18} />}
						<Text
							variant="medium"
							sx={{ textAlign: "center", lineHeight: 20, color: secureColor }}
							numberOfLines={1}
						>
							{webViewProps.url}
						</Text>
					</View>
				</Pressable>
			</View>
		);
	}
	return (
		<View style={ss.header}>
			<CloseModalButton onPress={props.handleClose} />
			<Text variant="h2" sx={{ textAlign: "center" }} numberOfLines={1}>
				{displayTitle(props.type)}
			</Text>
		</View>
	);
};

const CloseModalButton = ({ onPress }: { onPress?: () => void }) => {
	const { closeModal } = useModal();
	return (
		<IconButton
			onPress={() => {
				onPress && onPress();
				closeModal();
			}}
			sx={{ position: "absolute", left: 10, zIndex: 1 }}
		>
			<MdClose color="#fff" size={18} />
		</IconButton>
	);
};
const displayTitle = (type: TModalType) => {
	switch (type) {
		case "add-folder":
			return "ADD FOLDER";
		case "edit-folder":
			return "EDIT FOLDER";
		case "add-bookmark":
			return "ADD BOOKMARK";
		case "edit-bookmark":
			return "EDIT BOOKMARK";
		default:
			return "";
	}
};

const ss = StyleSheet.create({
	header: {
		height: 44,
		borderBottomColor: "#333",
		borderBottomWidth: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 8,
	},
});

/**
<Animated.View
	style={{
		transform: [
			{
				translateX: props.progress.interpolate({
					inputRange: [0, 0.2, 0.5, 1, 2],
					outputRange: [-width, -width + 80, -width + 220, 0, 0],
				}),
			},
		],
		opacity: props.progress.interpolate(
			{ inputRange: [0, 0.1, 1, 2], outputRange: [0, 1, 1, 0] }, //
		),
	}}
/>
<TouchableOpacity
	style={{ opacity: props.back ? 1 : 0.2 }}
	onPress={props.handleBack}
	disabled={!props.back}
	activeOpacity={0.75}
>
	<Image alt="forward" source={require("app/assets/png/arrow.png")} />
</TouchableOpacity>

<TouchableOpacity
	style={{
		marginRight: 15,
		opacity: props.forward ? 1 : 0.2,
		transform: [{ rotateY: "180deg" }],
	}}
	onPress={props.handleForward}
	disabled={!props.forward}
	activeOpacity={0.75}
>
	<Image alt="arrow" source={require("app/assets/png/arrow.png")} />
</TouchableOpacity>
	
<TouchableOpacity disabled>
	<Image alt="dots" source={require("app/assets/png/dots.png")} />
</TouchableOpacity>


*/
