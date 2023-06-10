import { FC } from "react";
import { ActivityIndicator, View } from "dripsy";

export const WebpageView: FC = ({}) => {
	// screen size switching: panel mode vs modal mode
	return (
		<View variants={["layout.center", "layout.secondary"]} sx={{ flex: 1 }}>
			<ActivityIndicator size="large" />
			<iframe
				style={{
					flex: 1,
					border: "none",
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
				}}
				loading="eager"
				sandbox="allow-scripts allow-modal"
				src="https://blog.logrocket.com/best-practices-react-iframes/"
			/>
		</View>
	);
};
