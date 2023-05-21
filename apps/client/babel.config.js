module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			require.resolve("expo-router/babel"),
			"@babel/plugin-proposal-export-namespace-from", // plugin to remove reanimated error -> https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web
			"react-native-reanimated/plugin",
		],
	};
};
