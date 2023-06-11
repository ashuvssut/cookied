import { RefObject, useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Animated } from "react-native";
import ActionModal from "./ActionModal";
import { TModal, ModalHeader } from "./ModalHeader";
import { RNWebView } from "app/components/WebView";
import { IRNWebViewRefProps } from "app/components/WebView";
import { atom, useAtom } from "jotai";

export const modalizeRefAtom = atom<RefObject<Modalize> | null>(null);
export const setPayloadAtom = atom<any>({});
export const modalTypeAtom = atom<TModal>("web-view");

export const Modal = () => {
	const ref = useRef<Modalize>(null);
	const [_m, setModalizeRef] = useAtom(modalizeRefAtom);
	const [payload, _s] = useAtom(setPayloadAtom);
	const [modalType, _mt] = useAtom(modalTypeAtom);
	useEffect(() => {
		setModalizeRef(ref);
	}, [ref, setModalizeRef]);

	const [url, setUrl] = useState("");
	const [secured, setSecure] = useState(true);
	const [back, setBack] = useState(false);
	const [forward, setForward] = useState(false);
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
		if (modalType === "add-bookmark") {
			if (payload.sharedData) {
				return (
					<ActionModal
						initialUrl={payload.sharedData as string}
						title="Add Bookmark"
						type={modalType}
						onClose={() => ref?.current?.close()}
					/>
				);
			}
			return (
				<ActionModal
					title="Add Bookmark"
					type={modalType}
					onClose={() => ref?.current?.close()}
				/>
			);
		}
		if (modalType === "edit-folder") {
			return (
				<ActionModal
					title="Edit Folder"
					type="edit-folder"
					onClose={() => ref?.current?.close()}
				/>
			);
		}
		if (modalType === "add-folder") {
			return (
				<ActionModal
					title="Add Folder"
					type="add-folder"
					onClose={() => ref?.current?.close()}
				/>
			);
		}
		if (modalType === "edit-bookmark") {
			return (
				<ActionModal
					title="Edit Bookmark"
					type="edit-bookmark"
					onClose={() => ref?.current?.close()}
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
			handleClose={ref?.current?.close}
		/>
	);
	return (
		<Modalize
			ref={ref}
			HeaderComponent={renderHeader()}
			adjustToContentHeight={true}
			// modalHeight={100}
			// snapPoint={100}
			// modalTopOffset={200}
		>
			{renderModal()}
		</Modalize>
	);
};
