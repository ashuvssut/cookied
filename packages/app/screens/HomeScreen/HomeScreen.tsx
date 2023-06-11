import Screen from "app/components/Screen";
import { Header } from "app/components/Header";
import { TreePanel } from "app/screens/HomeScreen/TreePanel";
import { View, Pressable } from "dripsy";
import { WebpageViewer } from "app/screens/HomeScreen/WebpageViewer";
import { Platform, useWindowDimensions } from "react-native";
import { View as MotiView, useAnimationState } from "moti";
import { MdMenu } from "app/assets/icons";

export default function HomeScreen() {
	const { width } = useWindowDimensions();
	// const fadeInDown = useFadeInDown();
	const scaleIn = useAnimationState({
		to: { opacity: 1 },
		from: { opacity: 0.9 },
		open: { scale: 0.8, translateX: -width / 2, borderRadius: 20 },
		close: { scale: 1, translateX: 0, borderRadius: 0 },
	});

	const onPress = () => {
		if (scaleIn.current === "open") scaleIn.transitionTo("close");
		else scaleIn.transitionTo("open");
	};
	const src = "https://blog.logrocket.com/best-practices-react-iframes/";
	return (
		<MotiView
			transition={{ type: "timing", duration: 350 }}
			style={{ overflow: "hidden" }}
			state={scaleIn}
		>
			<Screen>
				{Platform.OS !== "web" && (
					<View
						sx={{
							position: "absolute",
							top: 14,
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
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<MdMenu size={30} color="white" />
						</Pressable>
					</View>
				)}
				<View sx={{ height: "100%" }}>
					<Header />
					<View sx={{ flex: 1 }}>
						{Platform.OS === "web" ? (
							<View sx={{ flexDirection: "row", height: "100vh" }}>
								<TreePanel />
								<WebpageViewer src={src} />
							</View>
						) : (
							<>
								<TreePanel />
								<WebpageViewer src={src} />
							</>
						)}
					</View>
				</View>
			</Screen>
		</MotiView>
	);
}
