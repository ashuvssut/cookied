import { useAuth } from "@src/hooks/useAuth";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import "@pages/popup/Popup.scss";
import { Button3D } from "@src/components/Button3D";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grow from "@mui/material/Grow";
import { useState } from "react";
import { StaggeredTransition } from "@src/components/StaggeredTransition";
import "./index.css"

export const showAuthAtom = atomWithStorage("showAuth", false);
export default function Auth() {
	const [showAuth, _] = useAtom(showAuthAtom);
	const [showLogin, setShowLogin] = useState(true);
	if (!showAuth) return <LoginMessage />;
	if (showLogin) return <LoginForm toggleForm={() => setShowLogin(false)} />;
	return <SignupForm toggleForm={() => setShowLogin(true)} />;
}

type TFormProps = { toggleForm: () => void };
export const rememberMeAtom = atomWithStorage("rememberMe", false);
function LoginForm({ toggleForm }: TFormProps) {
	const { signIn } = useAuth();

	return (
		<Stack gap={2} component="form">
			<Typography variant="h5" align="center">
				LOGIN
			</Typography>
			<StaggeredTransition
				staggerTime={40}
				Transition={Grow}
				transitionProps={{ appear: true, in: true }}
			>
				<TextField label="Email" type="email" />
				<TextField label="Password" type="password" />
				<Box display="flex" alignItems="center" justifyContent="space-between">
					<FormControlLabel control={<Checkbox />} label="Remember me" />
					{/* TODO */}
					<Link href="#">Forgot password?</Link>
				</Box>
				<Button onClick={() => signIn()}>Login</Button>
			</StaggeredTransition>
			<Divider />
			<Box display="flex" justifyContent="center">
				<Typography variant="body1" align="center" mr={1}>
					Don't have an account?
				</Typography>
				<Link variant="body1" color="#87CEFA" onClick={toggleForm} href="#">
					Sign up
				</Link>
			</Box>
		</Stack>
	);
}

function SignupForm({ toggleForm }: TFormProps) {
	const { registerUser } = useAuth();

	return (
		<Stack gap={2} component="form">
			<Typography variant="h5" align="center">
				SIGNUP
			</Typography>
			<StaggeredTransition
				staggerTime={40}
				Transition={Grow}
				transitionProps={{ appear: true, in: true }}
			>
				<TextField label="Name" type="text" />
				<TextField label="Email" type="email" />
				<TextField label="Password" type="password" />
				<Button onClick={() => registerUser()}>Signup</Button>
			</StaggeredTransition>

			<Divider />
			<Box display="flex" justifyContent="center">
				<Typography variant="body1" align="center" mr={1}>
					Already have an account?
				</Typography>
				<Link variant="body1" color="#87CEFA" onClick={toggleForm} href="#">
					Login
				</Link>
			</Box>
		</Stack>
	);
}

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
