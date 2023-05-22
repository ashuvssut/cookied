import { createBox, createText, createTheme } from "@shopify/restyle";
import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const scale = width / 375;
const BREAKPOINTS = {
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
	xlargePhone:
		Platform.OS === "ios"
			? {
					width: 428,
					height: 926,
			  }
			: Platform.OS === "android"
			? {
					width: 480,
					height: 853,
			  }
			: {
					width: 1000,
					height: 746,
			  },
	largeScreen: {
		width: 1000,
		height: 746,
	},
};
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
		xs: 4 ,//* scale
		s: 8 ,//* scale
		m: 16 ,//* scale
		l: 24 ,//* scale
		xl: 32 ,//* scale
	},
	breakpoints: BREAKPOINTS,
	textVariants: {
		defaults: {
			fontSize: 16, // * scale
		},
		body: {
			// fontFamily: "SF-ProDisplay-Regular", * scale
			fontSize: 16,
		},
		banner: {
			// fontFamily: "Led-Counter-7", * scale
			fontSize: 27,
		},
		title: {
			// fontFamily: "SF-ProDisplay-Bold", * scale
			fontSize: 27,
		},
		header: {
			// fontFamily: "SF-ProDisplay-Bold", * scale
			fontSize: 24,
		},
		subtitle: {
			// fontFamily: "SF-ProDisplay-Medium", * scale
			fontSize: 23,
		},
		caption: {
			// fontFamily: "SF-ProDisplay-Light", * scale
			fontSize: 14,
		},
		label: {
			// fontFamily: "SF-ProDisplay-Medium", * scale
			fontSize: 12,
		},
		button: {
			// fontFamily: "SF-ProDisplay-Bold", * scale
			fontSize: 18,
		},
		menuItem: {
			// fontFamily: "SF-ProDisplay-Regular", * scale
			fontSize: 18,
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
