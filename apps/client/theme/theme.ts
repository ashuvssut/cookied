import { createBox, createText, createTheme } from "@shopify/restyle";
import { Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375;

const theme = createTheme({
	colors: {
		primary: "#7286D3",
		text: "#1F1F1F",
		background: "#FFFFFF",
		surface: "#F5F5F5",
		accent: "#FFC107",
		error: "#B00020",
		warning: "#FFA000",
		success: "#4CAF50",
		menuText: "#FFFFFF",
		white: "hsla(0, 0%, 100%, 1)",
		paragraph: "#43C3EC",
	},
	spacing: {
		xs: 4 * scale,
		s: 8 * scale,
		m: 16 * scale,
		l: 24 * scale,
		xl: 32 * scale,
	},
	breakpoints: {
		phone: {
			width: 0,
			height: 640,
		},
		tablet: {
			width: 768,
			height: 1024,
		},
		smallPhone: {
			width: 320,
			height: 568,
		},
		largePhone: {
			width: 414,
			height: 896,
		},
		...Platform.select({
			ios: {
				xlargePhone: {
					width: 428,
					height: 926,
				},
			},
			android: {
				xlargePhone: {
					width: 480,
					height: 853,
				},
			},
		}),
	},
	textVariants: {
		defaults: {
			fontSize: 16 * scale,
			lineHeight: 24 * scale,
		},
		body: {
			fontFamily: "SF-ProDisplay-Regular",
			fontSize: 16 * scale,
			lineHeight: 24 * scale,
		},
		banner: {
			fontFamily: "Led-Counter-7",
			fontSize: 27 * scale,
			lineHeight: 48 * scale,
		},
		title: {
			fontFamily: "SF-ProDisplay-Bold",
			fontSize: 27 * scale,
			lineHeight: 48 * scale,
		},
		header: {
			fontFamily: "SF-ProDisplay-Bold",
			fontSize: 24 * scale,
			lineHeight: 48 * scale,
		},
		subtitle: {
			fontFamily: "SF-ProDisplay-Medium",
			fontSize: 23 * scale,
			lineHeight: 36 * scale,
		},
		caption: {
			fontFamily: "SF-ProDisplay-Light",
			fontSize: 14 * scale,
			lineHeight: 21 * scale,
		},
		label: {
			fontFamily: "SF-ProDisplay-Medium",
			fontSize: 12 * scale,
			lineHeight: 18 * scale,
		},
		button: {
			fontFamily: "SF-ProDisplay-Bold",
			fontSize: 18 * scale,
			lineHeight: 27 * scale,
		},
		menuItem: {
			fontFamily: "SF-ProDisplay-Regular",
			fontSize: 18 * scale,
			lineHeight: 27 * scale,
		},
	},
	cardVariants: {
		primary: {
			padding: "m",
			borderRadius: "m",
			backgroundColor: "surface",
			shadowColor: "black",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 2,
		},
	},
});

export const darkTheme: Theme = {
	...theme,
	colors: {
		...theme.colors,
		primary: "hsla(228, 59%, 38%, 1)",
		text: "hsla(0, 0%, 100%, 1)",
		background: "hsla(0, 0%, 12%, 1)",
		surface: "hsla(0, 0%, 10%, 1)",
		accent: "hsla(45, 100%, 50%, 1)",
		error: "hsla(348, 64%, 56%, 1)",
		warning: "hsla(45, 100%, 50%, 1)",
		success: "hsla(123, 33%, 60%, 1)",
		menuText: "hsla(0, 0%, 100%, 1)",
		paragraph: "hsla(226, 46%, 45%, 1)",
	},
};

export type Theme = typeof theme;

export const lightTheme: Theme = {
	...theme,
	colors: {
		...theme.colors,
		primary: "hsla(226, 46%, 55%, 1)",
		text: "hsla(0, 0%, 12%, 1)",
		background: "hsla(0, 0%, 100%, 1)",
		surface: "hsla(0, 0%, 96%, 1)",
		accent: "hsla(45, 100%, 50%, 1)",
		error: "hsla(353, 100%, 38%, 1)",
		warning: "hsla(45, 100%, 50%, 1)",
		success: "hsla(123, 50%, 43%, 1)",
		menuText: "hsla(0, 0%, 100%, 1)",
		paragraph: "hsla(228, 59%, 38%, 1)",
	},
};

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const Card = createBox<Theme, typeof theme.cardVariants>();