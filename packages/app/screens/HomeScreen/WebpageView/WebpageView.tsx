/* eslint-disable react/display-name */
import { forwardRef, useRef, useState } from "react";
import { Text } from "dripsy";
import { Modalize } from "react-native-modalize";
import { Animated, TouchableOpacity } from "react-native";
import ActionModal from "app/components/ActionModal";
import ModalHeader, { TModal } from "app/components/ModalHeader";
import { RNWebView } from "app/components/WebView";
import { IRNWebViewRefProps } from "app/components/WebView/WebView.native";

export const WebpageView = forwardRef((_, ref) => {
	const modalizeRef = useRef<Modalize>(null);
	const [url, setUrl] = useState("");
	const [secured, setSecure] = useState(true);
	const [back, setBack] = useState(false);
	const [forward, setForward] = useState(false);
	const [modalType, setModalType] = useState<TModal>("web-view");
	const progress = useRef(new Animated.Value(0));

	const webViewRef = useRef<IRNWebViewRefProps>(null);
	const renderModal = () => {
		if (modalType === "web-view") {
			return (
				<RNWebView
					ref={webViewRef}
					uri="https://blog.logrocket.com/best-practices-react-iframes/"
					onWebpageStateChange={state => {
						setUrl(state.url);
						setSecure(state.secured);
						setBack(state.back);
						setForward(state.forward);
						progress.current = state.progress;
					}}
				/>
			);
		}
		if (modalType === "add-folder") {
			return <ActionModal title="Add Folder" type="add-folder" />;
		}
		if (modalType === "edit-folder") {
			return <ActionModal title="Edit Folder" type="edit-folder" />;
		}
		if (modalType === "add-bookmark") {
			return <ActionModal title="Add Bookmark" type="add-bookmark" />;
		}
		if (modalType === "edit-bookmark") {
			return <ActionModal title="Edit Bookmark" type="edit-bookmark" />;
		}
	};

	const onOpen = (type: TModal) => {
		setModalType(type);
		modalizeRef.current?.open();
	};
	const renderHeader = () => (
		<ModalHeader
			type={modalType}
			url={url}
			secured={secured}
			back={back}
			forward={forward}
			progress={progress.current}
			handleClose={modalizeRef.current?.close}
			handleBack={webViewRef.current?.goBack}
			handleForward={webViewRef.current?.goForward}
		/>
	);
	return (
		<>
			<TouchableOpacity
				activeOpacity={0.75}
				onPress={() => onOpen("web-view")}
				style={{ position: "absolute", top: 100 }}
			>
				<Text>Open the modal</Text>
			</TouchableOpacity>

			<Modalize
				// modalHeight={100}
				// snapPoint={100}
				// modalTopOffset={200}
				HeaderComponent={renderHeader()}
				adjustToContentHeight={true}
				ref={modalizeRef}
y			>
				{renderModal()}
			</Modalize>
		</>
	);
});
