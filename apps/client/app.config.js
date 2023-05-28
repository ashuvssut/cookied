const env = require("./env");

module.exports = {
	slug: "Cookied",
	name: "Cookied",
	version: "0.1.0",
	scheme: "cookied",
	assetBundlePatterns: ["**/*"],
	version: "1.0.0",
	extra: {
		MODE: process.env.MODE,
		...env,
	},
	web: { bundler: "metro" },
};
