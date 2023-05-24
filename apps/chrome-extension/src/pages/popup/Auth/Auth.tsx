import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import "@pages/popup/Popup.scss";
import { Button3D } from "@src/components/Button3D";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "./../index.css";
import { LoginForm } from "@src/pages/popup/Auth/LoginForm";
import { SignupForm } from "@src/pages/popup/Auth/SignupForm";

export const showAuthAtom = atomWithStorage("showAuth", false);
export const Auth = () => {
	const [showAuth, _] = useAtom(showAuthAtom);
	const [showLogin, setShowLogin] = useState(false);
	if (!showAuth) return <LoginMessage />;
	if (showLogin) return <LoginForm toggleForm={() => setShowLogin(false)} />;
	return <SignupForm toggleForm={() => setShowLogin(true)} />;
};

function LoginMessage() {
	const [_, setShowAuth] = useAtom(showAuthAtom);
	return (
		<Typography variant="h5" className="login-message">
			<Box display="flex" alignItems="center">
				Please <Button3D onClick={() => setShowAuth(true)}>Login</Button3D> to
			</Box>
			start saving your Bookmarks!
		</Typography>
	);
}
