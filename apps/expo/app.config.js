const env = require("./env");

module.exports = {
	slug: "Cookied",
	name: "Cookied",
	version: "0.1.0",
	scheme: "cookied",
	assetBundlePatterns: ["**/*"],
	extra: {
		...env,
		"eas": {
			"projectId": "42c6beb7-240e-4c27-bab8-a48661494de3"
		}
		// MODE: !!env.MODE ? env.MODE : "dev", // example
	},
	web: { bundler: "metro" },
	platforms: ["ios", "android"],
	ios: { bundleIdentifier: "com.cookied" },
	android: { package: "com.cookied" },
	plugins: [
		[
			"expo-build-properties",
			{
				ios: {
					flipper: true,
				},
			},
		],
	],
};
