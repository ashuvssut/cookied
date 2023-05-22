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

const Popup = () => {
	const [user, setUser] = useState(null);

	function onClick() {
		if (user !== null) {
			setUser(null);
			return;
		}
		setUser({
			username: "ABC",
			profileUrl: "https://randomuser.me/api/portraits/men/14.jpg",
		});
	}

	const [isTooltipOpen, setIsTooltipOpen] = useState(false);
	return (
		<ThemeProvider theme={theme}>
			<Box className="app" sx={{ p: 1 }}>
				<Paper component="header" sx={{ p: 2 }}>
					<Box display="flex" alignItems="center">
						<img src={logo} style={{ width: 35 }} alt="logo" />
						<Typography variant="h5" ml={1} fontWeight="bold">
							Cookied!!
						</Typography>
					</Box>

					<Tooltip
						title={user ? user.username : "Login here"}
						open={user === null ? true : isTooltipOpen}
						onMouseEnter={() => setIsTooltipOpen(true)}
						onMouseLeave={() => setIsTooltipOpen(false)}
					>
						<Avatar
							alt={user?.username}
							src={user?.profileUrl}
							sx={{ width: 35, height: 35, cursor: "pointer" }}
							onClick={onClick}
						/>
					</Tooltip>
				</Paper>
				<Paper component="main" sx={{ borderRadius: "0px 0px 5px 5px", p: 2 }}>
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
