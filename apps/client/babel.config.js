module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		env: {
			production: {
				plugins: ["react-native-paper/babel"],
			},
		},
		plugins: [
			// Removable in Expo SDK 49
			require.resolve("expo-router/babel"),
			[
				"module-resolver",
				{
					extensions: [
						".ts",
						".tsx",
						".android.ts",
						".android.tsx",
						".ios.ts",
						".ios.tsx",
					],
					alias: {
						src: "./src",
						"src/types": ["./src/types"],
						"src/types/redux": ["./src/redux/types"],
						"src/svg": ["./src/assets/svg/index"],
					},
				},
			],
			"react-native-reanimated/plugin", // !! added Reanimated plugin. It has to be listed last.
		],
	};
};
