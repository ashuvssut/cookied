import { useSafeArea } from "./SafeArea/useSafeArea";
import { FCC } from "app/types/IReact";
import { View } from "dripsy";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof View> {
	top?: number;
}

const Screen: FCC<Props> = ({ children, top = 0, sx, ...rest }) => {
	const inset = useSafeArea();
	const insetTop = !!top ? top : inset.top;
	return (
		<View
			sx={{
				pt: insetTop,
				bg: "primary",
				height: "100%",
				...sx,
			}}
			{...rest}
		>
			{!!insetTop ? <View>{children}</View> : children}
		</View>
	);
};

export default Screen;
