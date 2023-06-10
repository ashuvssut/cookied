/* eslint-disable react/display-name */
import { forwardRef, useCallback, useRef, useState } from "react";
import { Text } from "dripsy";
import { Modalize } from "react-native-modalize";
import { Animated, TouchableOpacity } from "react-native";
import ActionModal from "app/components/ActionModal";
import ModalHeader, { TModal } from "app/components/ModalHeader";
import { RNWebView } from "app/components/WebView";
import { IRNWebViewRefProps } from "app/components/WebView";
import { useSendIntent } from "app/hooks/useSendIntent";
import { useFocusEffect } from "expo-router";

export const WebpageView = forwardRef((_, ref) => {
	const modalizeRef = useRef<Modalize>(null);
	const [url, setUrl] = useState("");
	const [secured, setSecure] = useState(true);
	const [back, setBack] = useState(false);
	const [forward, setForward] = useState(false);
	const [modalType, setModalType] = useState<TModal>("web-view");
	const progress = useRef(new Animated.Value(0));

	const onOpen = (type: TModal) => {
		setModalType(type);
		modalizeRef.current?.open();
	};
	const closeModal = () => {
		modalizeRef.current?.close();
	};

	const { sharedData } = useSendIntent();
	useFocusEffect(
		useCallback(() => {
			if (sharedData) onOpen("add-bookmark");
		}, [sharedData]),
	);

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
		if (modalType === "add-bookmark") {
			if (sharedData) {
				return (
					<ActionModal
						initialUrl={sharedData as string}
						title="Add Bookmark"
						type={modalType}
						onClose={closeModal}
					/>
				);
			}
			return (
				<ActionModal
					title="Add Bookmark"
					type={modalType}
					onClose={closeModal}
				/>
			);
		}
		if (modalType === "edit-folder") {
			return (
				<ActionModal
					title="Edit Folder"
					type="edit-folder"
					onClose={closeModal}
				/>
			);
		}
		if (modalType === "add-folder") {
			return (
				<ActionModal
					title="Add Folder"
					type="add-folder"
					onClose={closeModal}
				/>
			);
		}
		if (modalType === "edit-bookmark") {
			return (
				<ActionModal
					title="Edit Bookmark"
					type="edit-bookmark"
					onClose={closeModal}
				/>
			);
		}
	};

	const renderHeader = () => (
		<ModalHeader
			type={modalType}
			url={url}
			secured={secured}
			back={back}
			handleBack={webViewRef.current?.goBack}
			forward={forward}
			handleForward={webViewRef.current?.goForward}
			progress={progress.current}
			handleClose={closeModal}
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
				ref={modalizeRef}
				HeaderComponent={renderHeader()}
				adjustToContentHeight={true}
				// modalHeight={100}
				// snapPoint={100}
				// modalTopOffset={200}
			>
				{renderModal()}
			</Modalize>
		</>
	);
});
