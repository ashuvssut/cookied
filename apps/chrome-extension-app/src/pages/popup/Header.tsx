import logo from "@assets/svg/good-cookie.svg";
import "@pages/popup/Popup.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import { useAuth } from "@src/hooks/useAuth";
import { useAtom } from "jotai";
import { showAuthAtom } from "@src/pages/popup/Auth/Auth";
import { useState } from "react";
import useTheme from "@mui/material/styles/useTheme";

export default function Header() {
	const { user } = useAuth();
	const [showHeaderMenu, setShowHeaderMenu] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	// get avatar separately - https://github.com/appwrite/appwrite/issues/3574#issuecomment-1191841176
	const dummyAvatar = "https://avatars.githubusercontent.com/u/60546840?v=4";
	return (
		<Paper component="header" sx={{ borderRadius: "5px 5px 0 0", p: 2 }}>
			<Box display="flex" alignItems="center">
				<img src={logo} style={{ width: 35 }} alt="logo" />
				<Typography variant="h5" ml={1} fontWeight="bold">
					Cookied!!
				</Typography>
			</Box>

			<Tooltip title={user ? user.name : ""}>
				<Box position="relative">
					<Avatar
						alt={user?.name}
						src={user ? dummyAvatar : undefined}
						sx={{
							width: 35,
							height: 35,
							cursor: "pointer",
							"& svg": { color: "background.paper" },
						}}
						onClick={e => {
							setAnchorEl(e.currentTarget);
							setShowHeaderMenu(prev => !prev);
						}}
					/>
					<HeaderMenu
						anchorEl={anchorEl}
						open={showHeaderMenu}
						onClose={() => setShowHeaderMenu(false)}
					/>
				</Box>
			</Tooltip>
		</Paper>
	);
}

function HeaderMenu(props: MenuProps) {
	const { user, signOut } = useAuth();
	const [_, setShowAuth] = useAtom(showAuthAtom);
	const bgcolor = useTheme().palette.divider;
	return (
		<Menu {...props} PaperProps={{ sx: { bgcolor } }}>
			{user ? (
				<MenuItem onClick={() => signOut()}>
					<ListItemIcon>
						<LogoutIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Logout</ListItemText>
				</MenuItem>
			) : (
				<MenuItem onClick={() => setShowAuth(true)}>
					<ListItemIcon>
						<LoginIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Login</ListItemText>
				</MenuItem>
			)}
		</Menu>
	);
}
