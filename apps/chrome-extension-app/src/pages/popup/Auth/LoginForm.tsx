import { useAuth } from "@src/hooks/useAuth";
import { atomWithStorage } from "jotai/utils";
import "@pages/popup/Popup.scss";
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
import { StaggeredTransition } from "@src/components/StaggeredTransition";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Snackbar } from "@src/components/Snackbar";

type TFormProps = { toggleForm: () => void };
export const rememberMeAtom = atomWithStorage("rememberMe", false);
const defaultFormData = { email: "", password: "" };
const rememberedloginFormDataAtom = atomWithStorage(
	"rememUserForm",
	defaultFormData,
);
export function LoginForm({ toggleForm }: TFormProps) {
	const { signIn } = useAuth();
	const [message, setMessage] = useState("");
	const [rememberMe, setRememberMe] = useAtom(rememberMeAtom);
	const [rememberedLoginFormData, setRememberedLoginFormData] = useAtom(
		rememberedloginFormDataAtom,
	);
	const [formData, setFormData] = useState(defaultFormData);
	const [formRememberMe, setFormRememberMe] = useState(rememberMe);
	useEffect(() => {
		setFormData(rememberMe ? rememberedLoginFormData : defaultFormData);
		setFormRememberMe(rememberMe);
	}, [rememberMe, rememberedLoginFormData]);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRememberMe(formRememberMe);
		try {
			validateLoginData(formData);
			if (formRememberMe) setRememberedLoginFormData(formData);
			// signIn(formData);
		} catch (e) {
			console.error(e);
			setMessage(String(e));
		}
	};
	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.currentTarget.value;
		const name = e.currentTarget.name as keyof typeof formData;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	return (
		<Stack gap={2} component="form" onSubmit={onSubmit}>
			<Typography variant="h5" align="center">
				LOGIN
			</Typography>
			<StaggeredTransition
				staggerTime={40}
				Transition={Grow}
				transitionProps={{ appear: true, in: true }}
			>
				<TextField
					label="Email"
					name="email"
					type="email"
					required
					value={formData.email}
					onChange={onChange}
				/>
				<TextField
					label="Password"
					name="password"
					type="password"
					inputProps={{ minLength: 8 }}
					required
					value={formData.password}
					onChange={onChange}
				/>
				<Box display="flex" alignItems="center" justifyContent="space-between">
					<FormControlLabel
						control={
							<Checkbox
								checked={formRememberMe}
								onChange={e => setFormRememberMe(e.target.checked)}
							/>
						}
						label="Remember me"
					/>
					{/* TODO */}
					<Link href="#">Forgot password?</Link>
				</Box>
				<Button type="submit">Login</Button>
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
			<Snackbar msg={message} />
		</Stack>
	);
}

function validateLoginData(data: any) {
	if (data.email.trim() === "") throw new Error("Enter your registered email");
	if (data.password.trim().length < 8)
		throw new Error("Password must be at least 8 characters long");
}
