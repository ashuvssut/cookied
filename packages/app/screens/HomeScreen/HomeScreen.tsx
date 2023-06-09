import Screen from "app/components/Screen";
import { Header } from "app/components/Header";
import { TreePanel } from "app/screens/HomeScreen/TreePanel";
import { View } from "dripsy";
import { WebpageView } from "app/screens/HomeScreen/WebpageView";
import { Platform } from "react-native";

export default function HomeScreen() {
	return (
		<Screen>
			<View sx={{ height: "100%" }}>
				<Header />
				<View sx={{ flex: 1 }}>
					{Platform.OS === "web" ? (
						<View sx={{ flexDirection: "row" }}>
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
	);
}
