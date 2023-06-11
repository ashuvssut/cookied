import { FC } from "react";
import { ActivityIndicator, Text, View } from "dripsy";
import { WebView } from "app/components/WebView";
import { useAtom } from "jotai";
import { activeUrlAtom } from "app/screens/HomeScreen/TreePanel";

export const WebpageViewer: FC = () => {
	const [src] = useAtom(activeUrlAtom);

	return (
		<View variants={["layout.center", "layout.secondary"]} sx={{ flex: 1 }}>
			<ActivityIndicator size="large" />
			{src ? (
				<WebView style={{ flex: 1 }} src={src} />
			) : (
				<Text>Open the modal</Text>
			)}
		</View>
	);
};
