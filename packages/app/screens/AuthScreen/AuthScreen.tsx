import React, { ReactNode } from "react";
import { Text, View } from "dripsy";
import { Svg } from "app/components/Svg";
import { StatusBar } from "app/components/StatusBar";
import { Header } from "app/components/Header";
import Screen from "app/components/Screen";
import { GoodCookie } from "app/assets/svg";

const AuthScreen = ({ ClerkInitiator }: { ClerkInitiator: ReactNode }) => {
	return (
		<Screen sx={{ alignItems: "center" }}>
			<StatusBar style="light" />
			<Header />
			<View
				sx={{ px: 30, gap: 40, flex: 1, alignItems: "center" }}
				variant="layout.center"
			>
				<View variant="layout.center" sx={{ width: [null, 600, 700] }}>
					<Svg
						Svg={GoodCookie}
						webSvgProps={{ style: { height: 200 } }}
						nativeSvgProps={{ height: 200 }}
					/>
				</View>
				<View>
					<Text variant="h1" sx={{ textAlign: "center", mb: 10 }}>
						Welcome to Cookied
					</Text>
					<Text
						variant="regular"
						sx={{ textAlign: "center", px: 30, maxWidth: 600 }}
					>
						The incredible cross-platform browser bookmarks app that allows you
						to access and manage your bookmarks from any desktop or mobile
						browser!
					</Text>
				</View>
				{ClerkInitiator}
			</View>
		</Screen>
	);
};

export default AuthScreen;
