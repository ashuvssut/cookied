/* eslint-disable react/display-name */
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { resetReduxPersist_reload } from "app/utils/storage";
import Screen from "app/components/Screen";
import { Header } from "app/components/Header";
import { View, Text } from "dripsy";
import { TreePanel } from "app/screens/HomeScreen/TreePanel";
import { WebpageView } from "app/screens/HomeScreen/WebpageView";
import { Modalize } from "react-native-modalize";
import {
	Animated,
	Dimensions,
	Easing,
	Platform,
	TouchableOpacity,
} from "react-native";
import { WebView as RNWebView } from "react-native-webview";
import { useCombinedRefs } from "app/hooks/useCombinedRef";

const { width, height: initialHeight } = Dimensions.get("window");
const isAndroid = Platform.OS === "android";

const extractHostname = url => {
	let hostname;

	if (url.indexOf("//") > -1) {
		hostname = url.split("/")[2];
	} else {
		hostname = url.split("/")[0];
	}

	hostname = hostname.split(":")[0];
	hostname = hostname.split("?")[0];

	return hostname;
};

const documentHeightCallbackScript = `
  function onElementHeightChange(elm, callback) {
    var lastHeight;
    var newHeight;
    (function run() {
      newHeight = Math.max(elm.clientHeight, elm.scrollHeight);
      if (lastHeight != newHeight) {
        callback(newHeight);
      }
      lastHeight = newHeight;
      if (elm.onElementHeightChangeTimer) {
        clearTimeout(elm.onElementHeightChangeTimer);
      }
      elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
  }
  onElementHeightChange(document.body, function (height) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        event: 'documentHeight',
        documentHeight: height,
      }),
    );
  });
`;

const HomeScreen = forwardRef((_, ref) => {
	const modalizeRef = useRef<Modalize>(null);
	const webViewRef = useRef<RNWebView>(null);
	const [url, setUrl] = useState("");
	const [secured, setSecure] = useState(true);
	const [mounted, setMounted] = useState(false);
	const [back, setBack] = useState(false);
	const [forward, setForward] = useState(false);
	const progress = useRef(new Animated.Value(0)).current;
	const [layoutHeight, setLayoutHeight] = useState(initialHeight);
	const [documentHeight, setDocumentHeight] = useState(initialHeight);
	const height = isAndroid ? documentHeight : layoutHeight;

	const onOpen = () => {
		modalizeRef.current?.open();
	};

	const handleClose = () => {
		if (modalizeRef.current) {
			modalizeRef.current.close();
		}
	};

	const handleLoad = status => {
		setMounted(true);

		if (status === "progress" && !mounted) {
			return;
		}

		const toValue = status === "start" ? 0.2 : status === "progress" ? 0.5 : 1;

		Animated.timing(progress, {
			toValue,
			duration: 200,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start();

		if (status === "end") {
			Animated.timing(progress, {
				toValue: 2,
				duration: 200,
				easing: Easing.ease,
				useNativeDriver: true,
			}).start(() => {
				progress.setValue(0);
			});
		}
	};

	const handleNavigationStateChange = useCallback(
		({ url, canGoBack, canGoForward, loading, navigationType }) => {
			setBack(canGoBack);
			setForward(canGoForward);
			setSecure(url.includes("https"));
			setUrl(extractHostname(url));

			if (!loading && !navigationType && isAndroid) {
				if (webViewRef.current) {
					webViewRef.current.injectJavaScript(documentHeightCallbackScript);
				}
			}
		},
		[],
	);

	const handleMessage = useCallback(event => {
		// iOS already inherit from the whole document body height,
		// so we don't have to manually get it with the injected script
		if (!isAndroid) {
			return;
		}

		const data = JSON.parse(event.nativeEvent.data);

		if (!data) {
			return;
		}

		switch (data.event) {
			case "documentHeight": {
				if (data.documentHeight !== 0) {
					setDocumentHeight(data.documentHeight);
				}

				break;
			}
		}
	}, []);

	const handleBack = () => {
		if (webViewRef.current) {
			webViewRef.current.goBack();
		}
	};

	const handleForward = () => {
		if (webViewRef.current) {
			webViewRef.current.goForward();
		}
	};

	const handleLayout = ({ layout }) => {
		setLayoutHeight(layout.height);
	};

	useEffect(() => {
		window["reset"] = resetReduxPersist_reload;
		// window["addMany"] = execAddMany;
		// window["addMany2"] = execAddManyFl;
		// console.log(JSON.stringify(bookmarkState, null, 2));
	}, []);

	const renderHeader = () => (
		<View
			sx={{
				height: 44,
				borderBottomColor: "#c1c4c7",
				borderBottomWidth: 1,
				borderTopLeftRadius: 12,
				borderTopRightRadius: 12,
				overflow: "hidden",
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					zIndex: 2,
					paddingHorizontal: 12,
					height: "100%",
				}}
			>
				<TouchableOpacity
					style={{ marginRight: 25 }}
					onPress={handleClose}
					activeOpacity={0.75}
				>
					{/* <Image source={require("../../assets/cross.png")} /> */}
				</TouchableOpacity>

				<TouchableOpacity
					style={{ opacity: back ? 1 : 0.2 }}
					onPress={handleBack}
					disabled={!back}
					activeOpacity={0.75}
				>
					{/* <Image source={require("../../assets/arrow.png")} /> */}
				</TouchableOpacity>

				<View
					sx={{
						flexDirection: "row",
						alignItems: "center",
						marginLeft: "auto",
					}}
				>
					{secured && (<></>
						// <Image
						// 	sx={{ tintColor: "#31a14c" }}
						// 	source={require("../../assets/lock.png")}
						// />
					)}
					<Text
						sx={{
							marginLeft: 4,
							fontSize: 16,
							fontWeight: "500",
							color: secured ? "#31a14c" : "#5a6266",
						}}
						numberOfLines={1}
					>
						{url}
					</Text>
				</View>

				<TouchableOpacity
					style={{ opacity: forward ? 1 : 0.2 }}
					onPress={handleForward}
					disabled={!forward}
					activeOpacity={0.75}
				>
					{/* <Image source={require("../../assets/arrow.png")} /> */}
				</TouchableOpacity>

				<TouchableOpacity disabled>
					{/* <Image source={require("../../assets/dots.png")} /> */}
				</TouchableOpacity>
			</View>

			<Animated.View
				style={
					{
						transform: [
							{
								translateX: progress.interpolate({
									inputRange: [0, 0.2, 0.5, 1, 2],
									outputRange: [-width, -width + 80, -width + 220, 0, 0],
								}),
							},
						],
						opacity: progress.interpolate({
							inputRange: [0, 0.1, 1, 2],
							outputRange: [0, 1, 1, 0],
						}),
					}
				}
			/>
		</View>
	);

	return (
		<>
			<Screen>
				<Header />
				<View sx={{ flexDirection: "row" }}>
					<TreePanel />
					<WebpageView />
				</View>
				<TouchableOpacity activeOpacity={0.75} onPress={onOpen}>
					<Text>Open the modal</Text>
				</TouchableOpacity>
			</Screen>
			<Modalize
				HeaderComponent={renderHeader()}
				// modalHeight={100}
				// snapPoint={100}
				// modalTopOffset={200}
				adjustToContentHeight={true}
				ref={modalizeRef}
			>
				<RNWebView
					ref={webViewRef}
					source={{
						uri: "https://google.com",
					}}
					onLoadStart={() => handleLoad("start")}
					onLoadProgress={() => handleLoad("progress")}
					onLoadEnd={() => handleLoad("end")}
					onNavigationStateChange={handleNavigationStateChange}
					onMessage={handleMessage}
					startInLoadingState={true}
					showsVerticalScrollIndicator={false}
					scrollEnabled={false}
					containerStyle={{ paddingBottom: 10 }}
					style={{ height }}
				/>
			</Modalize>
		</>
	);
});

export default HomeScreen;
