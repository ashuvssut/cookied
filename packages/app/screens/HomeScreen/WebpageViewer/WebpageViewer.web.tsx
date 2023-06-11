import { FC } from "react";
import { ActivityIndicator, View } from "dripsy";
import { WebView } from "app/components/WebView";

export const WebpageViewer: FC = () => {
	// screen size switching: panel mode vs modal mode
	return (
		<View variants={["layout.center", "layout.secondary"]} sx={{ flex: 1 }}>
			<ActivityIndicator size="large" />
			<WebView
				style={{ flex: 1 }}
				src="https://blog.logrocket.com/best-practices-react-iframes/"
			/>
		</View>
	);
};
