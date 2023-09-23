import { View } from "dripsy";
import {
	DetailedHTMLProps,
	FC,
	IframeHTMLAttributes,
	useEffect,
	useState,
} from "react";
import { Toast } from "app/components/Toast";
import { useAction } from "convex/react";
import { api } from "gconvex/_generated/api";

interface IWebView
	extends DetailedHTMLProps<
		IframeHTMLAttributes<HTMLIFrameElement>,
		HTMLIFrameElement
	> {}
export const WebView: FC<IWebView> = ({ src, style, ...props }) => {
	const [htmlContent, setHtmlContent] = useState<string | undefined>(undefined);

	const getWebResource = useAction(api.webContent.fetchWebpage);
	useEffect(() => {
		async function getHtml() {
			if (!src) {
				console.error("Missing URL. Cannot fetch iframe HTML")
				return;
			}
			try {
				const res = await getWebResource({ url: src });

				if (res.statusCode === 200) setHtmlContent(res.htmlDoc);
				else {
					console.error(`fetch webpage failed. Status: ${res.statusCode}`);
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
