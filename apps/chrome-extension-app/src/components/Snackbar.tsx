import MuiSnackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { FC, forwardRef, useEffect, useState } from "react";

interface ISnackbar extends AlertProps {
	msg: string;
}
export const Snackbar: FC<ISnackbar> = ({ msg }) => {
	const [message, setMessage] = useState(msg);
	function handleClose() {
		setMessage("");
	}
	useEffect(() => void setMessage(msg), [msg]);
	return (
		<MuiSnackbar open={!!message} autoHideDuration={4000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error">
				{message}
			</Alert>
		</MuiSnackbar>
	);
};
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
