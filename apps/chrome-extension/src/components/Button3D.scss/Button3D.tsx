import { FC, ReactNode } from "react";
import "./button-3d.scss";
import { Box } from "@mui/material";

interface Props {
	onClick: () => void;
	children?: ReactNode;
}
export const Button3D: FC<Props> = ({ children, onClick }) => {
	return (
		<Box component="span" className="table_center">
			<Box component="a" onClick={onClick}>
				{children}
			</Box>
		</Box>
	);
};
