const env = require("./env");

module.exports = {
	slug: "cookied",
	name: "Cookied",
	displayName: "Cookied",
	description: "A cross-platform bookmark manager",
	version: "0.1.0",
	scheme: "cookied",
	assetBundlePatterns: ["**/*"],
	owner: env.EAS_PROJECT_OWNER,
	orientation: "portrait",
	extra: {
		...env,
		eas: { projectId: env.EAS_PROJECT_ID },
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
		// backgroundColor: "#000000", bg theme color is managed by <Screen/> component
		playStoreUrl: "https://play.google.com/store/apps/details?id=com.cookied",
		intentFilters: [
			{ action: "SEND", category: "DEFAULT", data: { mimeType: "text/plain" } }, // For Bookmark URL send intent from browser
		],
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#F8E8EE",
		},
	},
	primaryColor: "#000000", // color of app in multitasker
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
