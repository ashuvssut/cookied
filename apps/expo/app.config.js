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
	extra: {
		...env,
		eas: {
			projectId: env.EAS_PROJECT_ID,
		},
		// MODE: !!env.MODE ? env.MODE : "dev", // example
	},
	web: { bundler: "metro" },
	platforms: ["ios", "android"],
	ios: { bundleIdentifier: "com.cookied" },
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
