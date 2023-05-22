import { createTheme } from "@mui/material/styles";

// $highlight-text: #f2f3f5;
// $highlight-bg: #3e4249;
//
// $text: #949aa5;
// $surface-bg: #2b2c30;
// $background-bg: #1e1f22;
export const theme = createTheme({
	palette: {
		primary: {
			main: "#2b2c30",
		},
		secondary: {
			main: "#3e4249",
		},
		background: {
			default: "#1e1f22",
			paper: "#2b2c30",
		},
		text: {
			primary: "#949aa5",
			secondary: "#f2f3f5",
		},
	},
	typography: {
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			"Segoe UI",
			"Roboto",
			"Oxygen",
			"Ubuntu",
			"Cantarell",
			"Fira Sans",
			"Droid Sans",
			"Helvetica Neue",
			"sans-serif",
		].join(","),
	},
});
