import { useAuth } from "@src/hooks/useAuth";
import "@pages/popup/Popup.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Grow from "@mui/material/Grow";
import { StaggeredTransition } from "@src/components/StaggeredTransition";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Snackbar } from "@src/components/Snackbar";

type TFormProps = { toggleForm: () => void };
export function SignupForm({ toggleForm }: TFormProps) {
	const { registerUser } = useAuth();
	const [message, setMessage] = useState("");
	const formData = useRef({ name: "", email: "", password: "" });
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			validateLoginData(formData.current);
			// registerUser(formData.current);
		} catch (e) {
      console.error(e);
			setMessage(String(e));
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.currentTarget.value;
		const name = e.currentTarget.name as keyof typeof formData.current;
		formData.current[name] = value;
	};

	return (
		<Stack gap={2} component="form" onSubmit={onSubmit}>
			<Typography variant="h5" align="center">
				SIGNUP
			</Typography>
			<StaggeredTransition
				staggerTime={40}
				Transition={Grow}
				transitionProps={{ appear: true, in: true }}
			>
				<TextField
					label="Name"
					name="name"
					type="text"
					required
					onChange={onChange}
					inputProps={{ minLength: 2 }}
				/>
				<TextField
					label="Email"
					name="email"
					type="email"
					required
					onChange={onChange}
				/>
				<TextField
					label="Password"
					name="password"
					type="password"
					inputProps={{ minLength: 8 }}
					required
					onChange={onChange}
				/>
				<Button type="submit">Signup</Button>
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
			<Snackbar msg={message} />
		</Stack>
	);
}

const validateLoginData = (data: any) => {
	if (data.name.trim().length < 2)
		throw new Error("Name must be at least 2 characters long");
	if (data.email.trim() === "") throw new Error("Enter a valid email");
	if (data.password.trim().length < 8)
		throw new Error("Password must be at least 8 characters long");
};
