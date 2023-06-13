import { usePressabilityApiStyles } from "app/hooks/usePressabilityApiStyles";
import { Pressable } from "dripsy";
import { ComponentProps, FC } from "react";

type PressableProps = ComponentProps<typeof Pressable>;
export const IconButton: FC<PressableProps> = ({ children, sx, ...props }) => {
	const style = usePressabilityApiStyles();
	return (
		<Pressable
			sx={{
				p: "$2",
				borderWidth: 1,
				borderRadius: 5,
				userSelect: "none",
				...sx,
			}}
			{...props}
			style={style}
		>
			{children}
		</Pressable>
	);
};
