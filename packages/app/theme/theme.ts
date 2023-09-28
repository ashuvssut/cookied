import { customFontConfig } from "app/theme/typography";
import { makeTheme } from "dripsy";

const commonConfig = makeTheme({
	...customFontConfig,
	space: { $0: 0, $1: 2, $2: 4, $3: 8, $4: 16, $5: 32 },
	layout: {
		secondary: {
			bg: "secondary",
			p: "$2",
			borderWidth: 1,
			borderColor: "#333",
		},
		center: { alignItems: "center", justifyContent: "center" },
		textInput: { bg: "secondary", py: "$3", px: 20, borderRadius: 4 },
		buttonContainer: { py: 15, px: 20, borderRadius: 4 },
		narrowHzTile: { px: "$3", py: "$2", justifyContent: "space-between" },
		row: { flexDirection: "row", alignItems: "center" },
		noBorderX: {
			borderWidth: 1,
			borderLeftWidth: 0,
			borderRightWidth: 0,
		},
		noTopRadius: { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
		absoluteFlex: {
			flex: 1,
			position: "absolute",
			top: 0,
			left: 0,
			height: "100%",
			width: "100%",
		},
	},
});

export const commonColors = {
	// Update in /apps/web/pages/styles.css too
	error: "#B00020",
	warning: "#FFA000",
	success: "#177e1a",
};

export const darkTheme = makeTheme({
	...commonConfig,
	colors: {
		// background colors
		primary: "#000000",
		surface: "#191919",
		surfaceHigh: "#232323",
		secondary: "#1D1B1B",

		// text colors
		onPrimary: "#FFFFFF",
		onInactive: "#A3A3A3",
		placeholder: "#565454",
		link: "#C1C1C1",

		// border and other highlight colors
		outline: "#0078d4",
		...commonColors,
	},
	linearGradients: {
		// contrib: linear gradients not working for <Gradient/> but works for <LinearGradient/>
		primaryButtonBg: ["#B313DB", "#FF00B8"],
		secondaryButtonBg: ["#000000", "#4D4855"],
		surfaceGradientBg: ["#1c1c1c", "#1c1c1c", "#1c1c1c", "#333"],
		disabledButtonBg: ["#3B939A", "#2B6467"],
		menuBackground: ["#647DEE", "#7F53AC"],
	},
	buttons: {
		secondary: { bg: "#2E3232" },
	},
	// textShadows: {
	// 	onSomeContainer: {
	// 		textShadowOffset: { width: 1, height: 1 },
	// 		textShadowRadius: 5,
	// 		textShadowColor: "#00000099",
	// 	},
	// },
});

export type CookiedTheme = typeof darkTheme;

export const lightTheme: any = makeTheme({
	// TODO: create light theme and then change from any to CookiedTheme
	...commonConfig,
});

declare module "dripsy" {
	interface DripsyCustomTheme extends CookiedTheme {}
}

// !Example theme-ui Theme
// export const theme = makeTheme({
// 	breakpoints: ["40em", "52em", "64em"],
// 	space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
// 	fonts: {
// 		body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
// 		heading: "inherit",
// 		monospace: "Menlo, monospace",
// 	},
// 	fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
// 	fontWeights: {
// 		body: "400",
// 		heading: "700",
// 		bold: "700",
// 	},
// 	lineHeights: {
// 		body: 1.5,
// 		heading: 1.125,
// 	},
// 	colors: {
// 		text: "#000",
// 		background: "#fff",
// 		primary: "#07c",
// 		secondary: "#30c",
// 		muted: "#f6f6f6",
// 	},
// 	text: {
// 		heading: {
// 			fontFamily: "heading",
// 			lineHeight: "heading",
// 			fontWeight: "heading",
// 		},
// 	},
// 	styles: {
// 		root: {
// 			fontFamily: "body",
// 			lineHeight: "body",
// 			fontWeight: "body",
// 		},
// 		h1: {
// 			variant: "text.heading",
// 			fontSize: 5,
// 		},
// 		h2: {
// 			variant: "text.heading",
// 			fontSize: 4,
// 		},
// 		h3: {
// 			variant: "text.heading",
// 			fontSize: 3,
// 		},
// 		h4: {
// 			variant: "text.heading",
// 			fontSize: 2,
// 		},
// 		h5: {
// 			variant: "text.heading",
// 			fontSize: 1,
// 		},
// 		h6: {
// 			variant: "text.heading",
// 			fontSize: 0,
// 		},
// 		pre: {
// 			fontFamily: "monospace",
// 			overflowX: "auto",
// 			code: {
// 				color: "inherit",
// 			},
// 		},
// 		code: {
// 			fontFamily: "monospace",
// 			fontSize: "inherit",
// 		},
// 		table: {
// 			width: "100%",
// 			borderCollapse: "separate",
// 			borderSpacing: 0,
// 		},
// 		th: {
// 			textAlign: "left",
// 			borderBottomStyle: "solid",
// 		},
// 		td: {
// 			textAlign: "left",
// 			borderBottomStyle: "solid",
// 		},
// 	},
// });

// !Previous Restyle Theme
// import { createBox, createText, createTheme } from "@shopify/restyle";
// import { Dimensions, Platform } from "react-native";

// const { width, height } = Dimensions.get("window");
// const scale = width / 375;
// const BREAKPOINTS = {
// 	phone: {
// 		width: 0,
// 		height: 640,
// 	},
// 	tablet: {
// 		width: 768,
// 		height: 1024,
// 	},
// 	smallPhone: {
// 		width: 320,
// 		height: 568,
// 	},
// 	largePhone: {
// 		width: 414,
// 		height: 896,
// 	},
// 	xlargePhone:
// 		isIos
// 			? {
// 					width: 428,
// 					height: 926,
// 			  }
// 			: isAndroid
// 			? {
// 					width: 480,
// 					height: 853,
// 			  }
// 			: {
// 					width: 1000,
// 					height: 746,
// 			  },
// 	largeScreen: {
// 		width: 1000,
// 		height: 746,
// 	},
// };
// const theme = createTheme({
// colors: {
// 	primary: "#7286D3",
// 	text: "#1F1F1F",
// 	textSecondary: "#1F1F1F",
// 	background: "#FFFFFF",
// 	surface: "#F5F5F5",
// 	accent: "#FFC107",
// 	error: "#B00020",
// 	warning: "#FFA000",
// 	success: "#4CAF50",
// 	menuText: "#FFFFFF",
// 	white: "hsla(0, 0%, 100%, 1)",
// 	paragraph: "#43C3EC",
// 	whiteBorder: "hsla(0, 0%, 35%, 0.64)",
// },
// 	spacing: {
// 		xs: 4, //* scale
// 		s: 8, //* scale
// 		m: 16, //* scale
// 		l: 24, //* scale
// 		xl: 32,
// 		xxl: 48,//* scale
// 	},
// 	breakpoints: BREAKPOINTS,
// 	textVariants: {
// 		defaults: {
// 			fontSize: 16, // * scale
// 		},
// 		body: {
// 			// fontFamily: "SF-ProDisplay-Regular", * scale
// 			fontSize: 16,
// 		},
// 		banner: {
// 			// fontFamily: "Led-Counter-7", * scale
// 			fontSize: 27,
// 		},
// 		title: {
// 			// fontFamily: "SF-ProDisplay-Bold", * scale
// 			fontSize: 27,
// 		},
// 		header: {
// 			// fontFamily: "SF-ProDisplay-Bold", * scale
// 			fontSize: 24,
// 		},
// 		subHeader: {
// 			// fontFamily: "SF-ProDisplay-Bold", * scale
// 			fontSize: 18,
// 		},
// 		subtitle: {
// 			// fontFamily: "SF-ProDisplay-Medium", * scale
// 			fontSize: 23,
// 		},
// 		caption: {
// 			// fontFamily: "SF-ProDisplay-Light", * scale
// 			fontSize: 14,
// 		},
// 		label: {
// 			// fontFamily: "SF-ProDisplay-Medium", * scale
// 			fontWeight:"300",
// 			fontSize: 18,
// 		},
// 		link: {
// 			fontWeight:"200",
// 			fontSize: 16,
// 		},
// 		button: {
// 			// fontFamily: "SF-ProDisplay-Bold", * scale
// 			fontSize: 18,
// 		},
// 		menuItem: {
// 			// fontFamily: "SF-ProDisplay-Regular", * scale
// 			fontSize: 18,
// 		},
// 	},
// 	cardVariants: {
// 		primary: {
// 			padding: "m",
// 			borderRadius: "m",
// 			backgroundColor: "surface",
// 			shadowColor: "black",
// 			shadowOffset: { width: 0, height: 2 },
// 			shadowOpacity: 0.1,
// 			shadowRadius: 4,
// 			elevation: 2,
// 		},
// 	},
// });

// export const darkTheme: Theme = {
// 	...theme,
// 	colors: {
// 		...theme.colors,
// 		primary: "hsla(228, 59%, 38%, 1)",
// 		text: "hsla(0, 0%, 100%, 1)",
// 		textSecondary: "hsla(0, 0%, 62%, 1)",
// 		background: "hsla(0, 0%, 0%, 1)",
// 		surface: "hsla(0, 0%, 10%, 1)",
// 		accent: "hsla(45, 100%, 50%, 1)",
// 		error: "hsla(348, 64%, 56%, 1)",
// 		warning: "hsla(45, 100%, 50%, 1)",
// 		success: "hsla(123, 33%, 60%, 1)",
// 		menuText: "hsla(0, 0%, 100%, 1)",
// 		paragraph: "hsla(226, 46%, 45%, 1)",
// 	},
// };

// export type Theme = typeof theme;

// export const lightTheme: Theme = {
// 	...theme,
// 	colors: {
// 		...theme.colors,
// 		primary: "hsla(226, 46%, 55%, 1)",
// 		text: "hsla(0, 0%, 12%, 1)",
// 		textSecondary: "hsla(0, 0%, 22%, 1)",
// 		background: "hsla(0, 0%, 100%, 1)",
// 		surface: "hsla(0, 0%, 96%, 1)",
// 		accent: "hsla(45, 100%, 50%, 1)",
// 		error: "hsla(353, 100%, 38%, 1)",
// 		warning: "hsla(45, 100%, 50%, 1)",
// 		success: "hsla(123, 50%, 43%, 1)",
// 		menuText: "hsla(0, 0%, 100%, 1)",
// 		paragraph: "hsla(228, 59%, 38%, 1)",
// 	},
// };

// export const Box = createBox<Theme>();
// export const TText = createText<Theme>();
// export const Card = createBox<Theme, typeof theme.cardVariants>();
