import { RefObject, useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Animated } from "react-native";
import { ModalHeader } from "app/components/Modal/ModalHeader";
import { WebView } from "app/components/WebView";
import { IWebViewRefProps } from "app/components/WebView";
import { atom, useAtom } from "jotai";
import { useDripsyTheme } from "dripsy";
import { isWeb } from "app/utils/constants";
import { IWebpageState } from "app/components/WebView/WebView";
import { useModal } from "app/components/Modal/useModal";
import { AddBmModal } from "app/components/Modal/ActionModals/AddBmModal";
import { AddFlModal } from "app/components/Modal/ActionModals/AddFlModal";

export const modalizeRefAtom = atom<RefObject<Modalize> | null>(null);
export const ModalController = ({ modalMaxWidth = 700 }) => {
	const ref = useRef<Modalize>(null);
	const [_m, setModalizeRef] = useAtom(modalizeRefAtom);
	useEffect(() => void setModalizeRef(ref), [ref, setModalizeRef]);

	const [webpageState, setWebpageState] = useState<IWebpageState>({
		url: "",
		secured: true,
		back: false,
		forward: false,
		progress: new Animated.Value(0),
	});
	const webViewRef = useRef<IWebViewRefProps>(null);

	const { modalType, webviewPayload } = useModal();

	const renderModal = () => {
		if (modalType === "web-view" && webviewPayload.src) {
			return (
				<WebView
					ref={webViewRef}
					src={webviewPayload.src}
					onWebpageStateChange={state => setWebpageState(state)}
				/>
			);
		}
		if (modalType === "add-bookmark") {
			return <AddBmModal />;
		}
		if (modalType === "add-folder") {
			return <AddFlModal />;
		}
		if (modalType === "edit-folder") {
			return <></>;
		}
		if (modalType === "edit-bookmark") {
			return <></>;
		}
	};

	const renderHeader = () => (
		<ModalHeader
			type={modalType}
			webViewProps={{
				goBack: () => webViewRef.current?.goBack(),
				goForward: () => webViewRef.current?.goForward(),
				...webpageState,
			}}
		/>
	);

	const primary = useDripsyTheme().theme.colors.primary;
	return (
		<Modalize
			ref={ref}
			HeaderComponent={renderHeader()}
			adjustToContentHeight={true}
			modalStyle={{
				backgroundColor: primary,
				maxWidth: isWeb ? modalMaxWidth : "100%",
				alignSelf: "center",
				width: "100%",
			}}
			rootStyle={{ backgroundColor: "#fff2" }}
			scrollViewProps={{ keyboardShouldPersistTaps: "always" }}
		>
			{renderModal()}
		</Modalize>
	);
};
