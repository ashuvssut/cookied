import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { atom, useAtom } from "jotai";

export const loadingAtom = atom(false);
function LoadingModal() {
	const [isLoading] = useAtom(loadingAtom);

	return (
		<Modal open={isLoading}>
			<div
				style={{
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					height: "100%",
				}}
			>
				<CircularProgress />;
			</div>
		</Modal>
	);
}

export default LoadingModal;
