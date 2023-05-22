import { useState } from "react";
import logo from "@assets/svg/good-cookie.svg";
import "@pages/popup/Popup.scss";
import {
	Box,
	Typography,
	Paper,
	ThemeProvider,
	Avatar,
	Tooltip,
} from "@mui/material";
import BookmarkForm from "@src/pages/popup/BookmarkForm";
import { theme } from "@src/theme";
import { useAuth } from "@src/hooks/useAuth";

const Popup = () => {
	const [isTooltipOpen, setIsTooltipOpen] = useState(false);
	const { user, signIn, signOut } = useAuth();
	function onAvatarClick() {
		console.log("user", user);
		if (user) {
			signOut();
		} else {
			signIn();
		}
	}

	// get avatar separately - https://github.com/appwrite/appwrite/issues/3574#issuecomment-1191841176
	const dummyAvatar = "https://avatars.githubusercontent.com/u/60546840?v=4";
	return (
		<ThemeProvider theme={theme}>
			<Box className="app" sx={{ p: 1 }}>
				<Paper component="header" sx={{ borderRadius: "5px 5px 0 0", p: 2 }}>
					<Box display="flex" alignItems="center">
						<img src={logo} style={{ width: 35 }} alt="logo" />
						<Typography variant="h5" ml={1} fontWeight="bold">
							Cookied!!
						</Typography>
					</Box>

					<Tooltip
						title={user ? user.name : "Login here"}
						open={user === null ? true : isTooltipOpen}
						onMouseEnter={() => setIsTooltipOpen(true)}
						onMouseLeave={() => setIsTooltipOpen(false)}
					>
						<Avatar
							alt={user?.name}
							src={user ? dummyAvatar : undefined}
							sx={{ width: 35, height: 35, cursor: "pointer" }}
							onClick={onAvatarClick}
						/>
					</Tooltip>
				</Paper>
				<Paper component="main" sx={{ borderRadius: "0 0 5px 5px", p: 2 }}>
					{user ? (
						<BookmarkForm />
					) : (
						<Typography variant="h5" align="center">
							Please Login to start saving your Bookmarks⚡️
						</Typography>
					)}
				</Paper>
			</Box>
		</ThemeProvider>
	);
};

export default Popup;
