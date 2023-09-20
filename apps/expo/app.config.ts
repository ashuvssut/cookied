import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
	slug: "cookied",
	name: "Cookied",
	description: "A cross-platform bookmark manager",
	version: "0.1.0",
	scheme: "cookied",
	assetBundlePatterns: ["**/*"],
	owner: "ashuvssut",
	orientation: "portrait",
	extra: {
		EAS_PROJECT_OWNER: "ashuvssut",
		EAS_PROJECT_ID: "664b92a2-77d0-4698-8e63-f7f05f584eed",
		VERCEL_DEV_ENDPOINT: "http://localhost:2023/api",
		VERCEL_PROD_ENDPOINT: "https://cookied.vercel.app/api",
		CLERK_PUBLISHABLE_KEY:
			"pk_test_cGxlYXNhbnQtc2VhbC04MC5jbGVyay5hY2NvdW50cy5kZXYk",
		CONVEX_URL: "https://exuberant-perch-307.convex.cloud",
		eas: { projectId: "664b92a2-77d0-4698-8e63-f7f05f584eed" },
		// MODE: !!env.MODE ? env.MODE : "dev", // example
	},
	web: {
		bundler: "metro",
		favicon: "./assets/96-icon.png", // 96x96
	},
	platforms: [
		// "ios",
		"android",
	],
	// ios: { bundleIdentifier: "com.cookied" },
	android: {
		package: "com.cookied",
		// backgroundColor: "#000000", // bg theme color is managed by <Screen/> component
		playStoreUrl: "https://play.google.com/store/apps/details?id=com.cookied",
		intentFilters: [
			{ action: "SEND", category: "DEFAULT", data: { mimeType: "text/plain" } }, // For Bookmark URL send intent from browser
		],
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#F8E8EE",
		},
	},
	primaryColor: "#000000",
	userInterfaceStyle: "automatic", // TODO: Splash screen adaptive colors was not working even if its set to automatic. Splash screen is always in light mode.
	splash: {
		resizeMode: "contain",
		image: "./assets/splash-darkbg.png",
		backgroundColor: "#000000",
		// TODO: Can not implement adaptive splash screen as of now because it can no detect if System has dark mode enabled or not + androidStatusBar color is not adaptive
		// resizeMode: "contain",
		// image: "./assets/splash-lightbg.png",
		// backgroundColor: "#F8E8EE",
		// dark: {
		// 	resizeMode: "contain",
		// 	image: "./assets/splash-darkbg.png",
		// 	backgroundColor: "#000000",
		// },
	},
	androidStatusBar: {
		// TODO hide status bar on start when adaptive splash screen is implemented
		barStyle: "light-content",
		backgroundColor: "#000000",
	},
	plugins: [["expo-build-properties", { ios: { flipper: true } }]],
	githubUrl: "https://github.com/ashuvssut/cookied",
};

export default config;
