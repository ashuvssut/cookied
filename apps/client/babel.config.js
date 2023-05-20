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
			require.resolve("expo-router/babel"),//expo router plugin
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
			'@babel/plugin-proposal-export-namespace-from',//plugin to remove reanimated error -> https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web
			"react-native-reanimated/plugin",
		],
	};
};
