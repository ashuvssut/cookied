import { DetailedHTMLProps, FC, IframeHTMLAttributes } from "react";

interface IWebView
	extends DetailedHTMLProps<
		IframeHTMLAttributes<HTMLIFrameElement>,
		HTMLIFrameElement
	> {}
export const WebView: FC<IWebView> = ({ src, style, ...props }) => {
	return (
		<iframe
			style={{
				border: "none",
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				...style,
			}}
			loading="eager"
			sandbox="allow-modals"
			src={src}
			{...props}
		/>
	);
};
