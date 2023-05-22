import { createTheme } from "@mui/material/styles";

// $highlight-text: #cfd0d4;
// $highlight-bg: #3e4249;
//
// $text: #949aa5;
// $surface-bg: #2b2c30;
// $background-bg: #1e1f22;
export const theme = createTheme({
	palette: {
		primary: {
			main: "#cfd0d4",
		},
		background: {
			default: "#1e1f22",
			paper: "#2b2c30",
		},
		text: {
			primary: "#cfd0d4",
			secondary: "#949aa5",
		},
		divider: "#3e4047",
		action: {
			hoverOpacity: 0.15,
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
	components: {
		MuiTextField: {
			defaultProps: {
				variant: "outlined",
			},
			styleOverrides: {
				root: {
					// change background color of input
					"& .MuiOutlinedInput-root": {
						backgroundColor: "#1e1f22",
						"& fieldset": {
							borderColor: "#1e1f22",
						},
					},
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				icon: {
					color: "#f2f3f5",
				},
				outlined: {
					backgroundColor: "#1e1f22",
					borderColor: "#1e1f22",
				},
			},
		},
		MuiButton: {
			defaultProps: {
				variant: "outlined",
			},
			styleOverrides: {
				root: {
					padding: "8px 24px",
					borderRadius: 10,
				},
			},
		},
	},
});
