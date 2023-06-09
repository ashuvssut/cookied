import { FC, useRef } from "react";
import { View } from "dripsy";
import { WebView } from "react-native-webview";
import ModalHeader from "app/components/ModalHeader";

interface IProps {}

export const WebpageView: FC<IProps> = ({}) => {
	const webViewRef = useRef<WebView>(null);

	// screen size switching: panel mode vs modal mode
	return (
		<View sx={{ backgroundColor: "active", flex: 7 }}>
			<iframe
				style={{ flex: 1, border: "none", backgroundColor: "yellow" }}
				loading="eager"
				sandbox="allow-scripts allow-modal"
				src="https://blog.logrocket.com/best-practices-react-iframes/"
			></iframe>
		</View>
	);
};
