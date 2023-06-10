import Screen from "app/components/Screen";
import { Header } from "app/components/Header";
import { TreePanel } from "app/screens/HomeScreen/TreePanel";
import { View, Text, Pressable } from "dripsy";
import { WebpageView } from "app/screens/HomeScreen/WebpageView";
import { Dimensions, Platform } from "react-native";
import { View as MotiView, useAnimationState } from "moti";
import { MotiPressable, useMotiPressable } from "moti/interactions";
import { MdMenu } from "app/assets/icons";

const { width } = Dimensions.get("window");

const useFadeInDown = () => {
	return useAnimationState({
		from: {
			scale: 1,
			translateX: 0,
		},
		to: {
			scale: 0.8,
			translateX: -width / 2,
		},
	});
};

export default function HomeScreen() {
	// const fadeInDown = useFadeInDown();

	const scaleIn = useAnimationState({
		to: { opacity: 1 },
		from: { opacity: 0.9 },
		open: {
			scale: 0.8,
			translateX: -width / 2,
			borderRadius: 20,
		},
		close: {
			scale: 1,
			translateX: 0,
			borderRadius: 0,
		},
	});

	const onPress = () => {
		console.log("Hello");
		if (scaleIn.current === "open") {
			scaleIn.transitionTo("close");
		} else {
			scaleIn.transitionTo("open");
		}
	};

	return (
		<MotiView
			transition={{
				type: "timing",
				duration: 350,
			}}
			style={{ overflow: "hidden" }}
			state={scaleIn}
		>
			<Screen>
				<View
					sx={{
						position: "absolute",
						top: 10,
						right: 20,
						zIndex: 5,
						elevation: 2,
					}}
				>
					<Pressable
						hitSlop={30}
						onPress={onPress}
						sx={{
							width: 35,
							height: 35,
							elevation: 5,
							borderRadius: 5,
							borderWidth: 1,
							borderColor: "white",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<MdMenu size={30} color="white" />
					</Pressable>
				</View>
				<View sx={{ height: "100%" }}>
					<Header />
					<View sx={{ flex: 1 }}>
						{Platform.OS === "web" ? (
							<View sx={{ flexDirection: "row", height: "100vh" }}>
								<TreePanel />
								<WebpageView />
							</View>
						) : (
							<>
								<TreePanel />
								<WebpageView />
							</>
						)}
					</View>
				</View>
			</Screen>
		</MotiView>
	);
}
