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
import { Animated, Easing, useWindowDimensions } from "react-native";
import {
	WebView as RNWebView,
	WebViewMessageEvent,
} from "react-native-webview";
import {
	documentHeightCallbackScript,
	extractHostname,
} from "app/components/WebView/utils";
import { isAndroid } from "app/utils/constants";

export interface IWebpageState {
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
		const [mounted, setMounted] = useState<IWebpageState["secured"]>(false);
		const [webpageState, setWebpageState] = useState<IWebpageState>({
			url: "",
			secured: true,
			back: false,
			forward: false,
			progress: new Animated.Value(0),
		});

		const { height: initialHeight } = useWindowDimensions();
		const [layoutHeight, setLayoutHeight] = useState(initialHeight);
		const [documentHeight, setDocumentHeight] = useState(initialHeight);
		const height = isAndroid ? documentHeight : layoutHeight;

		const handleLoad = (status: "start" | "end" | "progress") => {
			setMounted(true);
			if (status === "progress" && !mounted) return;

			const toValue =
				status === "start" ? 0.2 : status === "progress" ? 0.5 : 1;
			Animated.timing(webpageState.progress, {
				toValue,
				duration: 200,
				easing: Easing.ease,
				useNativeDriver: true,
			}).start();

			if (status === "end") {
				Animated.timing(webpageState.progress, {
					toValue: 2,
					duration: 200,
					easing: Easing.ease,
					useNativeDriver: true,
				}).start(() => webpageState.progress.setValue(0));
			}
		};
		type THandleNavStateChng = {
			url: string;
			canGoBack: boolean;
			canGoForward: boolean;
			loading: boolean;
			navigationType: string;
		};
		const handleNavigationStateChange = useCallback(
			(navState: THandleNavStateChng) => {
				const { url, canGoBack, canGoForward, loading, navigationType } =
					navState;
				setWebpageState({
					url: extractHostname(url),
					secured: url.includes("https"),
					back: canGoBack,
					forward: canGoForward,
					progress: webpageState.progress,
				});

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
			if (onWebpageStateChange) onWebpageStateChange(webpageState);
		}, [webpageState]);

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
