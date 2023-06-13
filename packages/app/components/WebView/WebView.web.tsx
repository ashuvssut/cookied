import { View } from "dripsy";
import { DetailedHTMLProps, FC, IframeHTMLAttributes } from "react";

interface IWebView
	extends DetailedHTMLProps<
		IframeHTMLAttributes<HTMLIFrameElement>,
		HTMLIFrameElement
	> {}
export const WebView: FC<IWebView> = ({ src, style, ...props }) => {
	return (
		<View variant="layout.absoluteFlex">
			<iframe
				style={{ border: "none", ...style }}
				loading="eager"
				sandbox="allow-modals"
				src={src}
				{...props}
			/>
		</View>
	);
};
