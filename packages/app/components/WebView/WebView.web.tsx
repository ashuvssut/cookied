import { View } from "dripsy";
import {
	DetailedHTMLProps,
	FC,
	IframeHTMLAttributes,
	useEffect,
	useState,
} from "react";
import { Toast } from "app/components/Toast";

interface IWebView
	extends DetailedHTMLProps<
		IframeHTMLAttributes<HTMLIFrameElement>,
		HTMLIFrameElement
	> {}
export const WebView: FC<IWebView> = ({ src, style, ...props }) => {
	const [htmlContent, setHtmlContent] = useState<string | undefined>(undefined);

	useEffect(() => {
		async function getHtml() {
			if (!src) return;
			try {
				const res = await fetch(
					"http://localhost:2023/api/webpage-fetch?url=" + src,
				);

				if (res.status === 200) {
					const json = await res.json();
					console.log(json.body)
					setHtmlContent(json.body);
				} else {
					console.error(`fetch webpage failed. Status: ${res.status}`);
					Toast.error(`Something went wrong! Failed to fetch webpage`);
				}
			} catch (error) {
				console.error("Error fetching HTML content:", error);
			}
		}

		getHtml();
	}, [src]);

	return (
		<View variant="layout.absoluteFlex">
			<iframe
				style={{ border: "none", ...style }}
				loading="eager"
				sandbox="allow-modals"
				srcDoc={htmlContent || ""}
				{...props}
			/>
		</View>
	);
};
