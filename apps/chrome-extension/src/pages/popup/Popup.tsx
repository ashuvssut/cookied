import "@pages/popup/Popup.scss";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import BookmarkForm from "@src/pages/popup/BookmarkForm";
import { theme } from "@src/theme";
import { useAuth } from "@src/hooks/useAuth";
import Header from "@src/pages/popup/Header";
import { Auth } from "@src/pages/popup/Auth";

const Popup = () => {
	const { user, signIn, signOut } = useAuth();

	return (
		<ThemeProvider theme={theme}>
			<Box className="app" sx={{ p: 1 }}>
				<Header />
				<Paper component="main" sx={{ borderRadius: "0 0 5px 5px", p: 2 }}>
					{user ? <BookmarkForm /> : <Auth />}
				</Paper>
			</Box>
		</ThemeProvider>
	);
};

export default Popup;
