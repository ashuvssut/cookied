import {
	ComponentProps,
	ForwardedRef,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { Animated, Dimensions, Easing, Platform } from "react-native";
import {
	WebView as RNWebView,
	WebViewMessageEvent,
} from "react-native-webview";
import {
	documentHeightCallbackScript,
	extractHostname,
} from "app/components/WebView/utils";

const { height: initialHeight } = Dimensions.get("window");
const isAndroid = Platform.OS === "android";

interface IWebpageState {
	url: string;
	secured: boolean;
	back: boolean;
	forward: boolean;
	progress: Animated.Value;
}

interface IWebView extends ComponentProps<typeof RNWebView> {
	src: string;
	onWebpageStateChange?: (state: IWebpageState) => void;
}
export interface IWebViewRefProps {
	goBack: () => void;
	goForward: () => void;
}
export const WebView = forwardRef(
	(props: IWebView, ref: ForwardedRef<IWebViewRefProps>) => {
		const { src, onWebpageStateChange, ...restProps } = props;
		const webViewRef = useRef<RNWebView>(null);
		const [url, setUrl] = useState<IWebpageState["url"]>("");
		const [secured, setSecure] = useState<IWebpageState["secured"]>(true);
		const [mounted, setMounted] = useState<IWebpageState["secured"]>(false);
		const [back, setBack] = useState<IWebpageState["back"]>(false);
		const [forward, setForward] = useState<IWebpageState["forward"]>(false);
		const [layoutHeight, setLayoutHeight] = useState(initialHeight);
		const [documentHeight, setDocumentHeight] = useState(initialHeight);
		const height = isAndroid ? documentHeight : layoutHeight;
		const progress = useRef<IWebpageState["progress"]>(
			new Animated.Value(0),
		).current;

		const handleLoad = (status: "start" | "end" | "progress") => {
			setMounted(true);
			if (status === "progress" && !mounted) return;

			const toValue =
				status === "start" ? 0.2 : status === "progress" ? 0.5 : 1;
			Animated.timing(
				progress, //
				{ toValue, duration: 200, easing: Easing.ease, useNativeDriver: true },
			).start();

			if (status === "end") {
				Animated.timing(progress, {
					toValue: 2,
					duration: 200,
					easing: Easing.ease,
					useNativeDriver: true,
				}).start(() => progress.setValue(0));
			}
		};
		const handleNavigationStateChange = useCallback(
			({ url, canGoBack, canGoForward, loading, navigationType }) => {
				setBack(canGoBack);
				setForward(canGoForward);
				setSecure(url.includes("https"));
				setUrl(extractHostname(url));

				if (!loading && !navigationType && isAndroid) {
					webViewRef.current?.injectJavaScript(documentHeightCallbackScript);
				}
			},
			[],
		);

		const handleMessage = useCallback((event: WebViewMessageEvent) => {
			// iOS already inherit from the whole document body height,
			// so we don't have to manually get it with the injected script
			if (!isAndroid) return;

			const data = JSON.parse(event.nativeEvent.data);
			if (!data) return;

			switch (data.event) {
				case "documentHeight": {
					if (data.documentHeight !== 0) setDocumentHeight(data.documentHeight);
					break;
				}
			}
		}, []);

		const goBack = useCallback(() => {
			if (webViewRef.current) webViewRef.current.goBack();
		}, [webViewRef.current]);
		const goForward = useCallback(() => {
			if (webViewRef.current) webViewRef.current.goForward();
		}, [webViewRef.current]);
		useImperativeHandle(
			ref, //
			() => ({ goBack, goForward }),
			[goBack, goForward],
		);

		useEffect(() => {
			if (onWebpageStateChange)
				onWebpageStateChange({ url, secured, back, forward, progress });
		}, [url, secured, back, forward, progress]);

		return (
			<RNWebView
				ref={webViewRef}
				source={{ uri: src }}
				onLayout={e => setLayoutHeight(e.nativeEvent.layout.height)}
				onLoadStart={() => handleLoad("start")}
				onLoadProgress={() => handleLoad("progress")}
				onLoadEnd={() => handleLoad("end")}
				onNavigationStateChange={handleNavigationStateChange}
				onMessage={handleMessage}
				startInLoadingState={true}
				showsVerticalScrollIndicator={true}
				scrollEnabled={true}
				containerStyle={{ paddingBottom: 10 }}
				style={{ height }}
				{...restProps}
			/>
		);
	},
);
