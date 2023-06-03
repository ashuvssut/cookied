const { withExpo } = require("@expo/next-adapter");

/** @type {import('next').NextConfig} */
const nextConfig = {
	// webpack(config) {
	// 	config.module.rules.push({
	// 		// resolve fonts
	// 		test: /\.(woff|woff2|eot|ttf|otf)$/,
	// 		type: "asset/resource",
	// 	});
	// 	return config;
	// },

	// reanimated (and thus, Moti) doesn't work with strict mode currently...
	// https://github.com/nandorojo/moti/issues/224
	// https://github.com/necolas/react-native-web/pull/2330
	// https://github.com/nandorojo/moti/issues/224
	// once that gets fixed, set this back to true
	reactStrictMode: false,
	transpilePackages: [
		"react-native",
		"react-native-web",
		"solito",
		"dripsy",
		"@dripsy/core",
		"moti",
		"app",
		"react-native-reanimated",
		"@expo/html-elements",
		"react-native-gesture-handler",
		"expo-modules-core",
		"expo-constants",
	],
};

module.exports = withExpo(nextConfig);
