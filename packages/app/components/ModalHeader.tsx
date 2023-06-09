import { TModal } from "app/screens/HomeScreen/HomeScreen.native";
import { View, Text, Image } from "dripsy";
import {
	Animated,
	Dimensions,
	Easing,
	Platform,
	TouchableOpacity,
} from "react-native";

const { width, height: initialHeight } = Dimensions.get("window");

export interface IModalHeaderProps {
	type: TModal;
	url?: string;
	secured?: boolean;
	back?: boolean;
	forward?: boolean;
	progress?: Animated.Value;
	handleClose?: () => void;
	handleBack?: () => void;
	handleForward?: () => void;
}

const ModalHeader = (props: IModalHeaderProps) => {
	const displayTitle = () => {
		if (props.type === "add-folder") {
			return "ADD FOLDER";
		}
		if (props.type === "add-bookmark") {
			return "ADD BOOKMARK";
		}
		if (props.type === "edit-folder") {
			return "EDIT FOLDER";
		}
		if (props.type === "edit-bookmark") {
			return "EDIT BOOKMARK";
		}
		return "";
	};

	if (props.type === "web-view" && props.progress) {
		return (
			<View
				sx={{
					height: 44,
					borderBottomColor: "#c1c4c7",
					borderBottomWidth: 1,
					borderTopLeftRadius: 12,
					borderTopRightRadius: 12,
					overflow: "hidden",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						zIndex: 2,
						paddingHorizontal: 12,
						height: "100%",
					}}
				>
					<TouchableOpacity
						hitSlop={30}
						style={{
							marginRight: 25,
						}}
						onPress={props.handleClose}
						activeOpacity={0.75}
					>
						<Image alt="Cross" source={require("app/assets/png/cross.png")} />
					</TouchableOpacity>

					<TouchableOpacity
						hitSlop={30}
						style={{
							opacity: props.back ? 1 : 0.2,
						}}
						onPress={props.handleBack}
						disabled={!props.back}
						activeOpacity={0.75}
					>
						<Image alt="forward" source={require("app/assets/png/arrow.png")} />
					</TouchableOpacity>

					<View
						sx={{
							flex: 1,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center", // marginLeft: "auto",
						}}
					>
						{props.secured && (
							<Image
								alt="lock"
								sx={{
									tintColor: "#31a14c",
								}}
								source={require("app/assets/png/lock.png")}
							/>
						)}
						<Text
							sx={{
								marginLeft: 4,
								fontSize: 16,
								textAlign: "center",
								fontWeight: "500",
								color: props.secured ? "#31a14c" : "#5a6266",
							}}
							numberOfLines={1}
						>
							{props.url}
						</Text>
					</View>

					<TouchableOpacity
						hitSlop={30}
						style={{
							marginRight: 15,
							opacity: props.forward ? 1 : 0.2,
							transform: [{ rotateY: "180deg" }],
						}}
						onPress={props.handleForward}
						disabled={!props.forward}
						activeOpacity={0.75}
					>
						<Image alt="lock" source={require("app/assets/png/arrow.png")} />
					</TouchableOpacity>

					<TouchableOpacity hitSlop={30} disabled>
						<Image alt="dots" source={require("app/assets/png/dots.png")} />
					</TouchableOpacity>
				</View>

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
						opacity: props.progress.interpolate({
							inputRange: [0, 0.1, 1, 2],
							outputRange: [0, 1, 1, 0],
						}),
					}}
				/>
			</View>
		);
	}
	return (
		<View
			sx={{
				height: 44,
				borderBottomColor: "#c1c4c7",
				borderBottomWidth: 1,
				borderTopLeftRadius: 12,
				borderTopRightRadius: 12,
				overflow: "hidden",
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					zIndex: 2,
					paddingHorizontal: 12,
					height: "100%",
				}}
			>
				<View
					sx={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text
						sx={{
							fontSize: 16,
							textAlign: "center",
							fontWeight: "500",
							color: "#000000",
						}}
						numberOfLines={1}
					>
						{displayTitle()}
					</Text>
				</View>
			</View>
		</View>
	);
};
export default ModalHeader;
