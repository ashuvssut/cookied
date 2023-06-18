import { RefObject, useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Animated } from "react-native";
import { ActionModal } from "app/components/Modal/ActionModal";
import { TModal } from "app/components/Modal/ModalHeader";
import { ModalHeader } from "app/components/Modal/ModalHeader";
import { WebView } from "app/components/WebView";
import { IWebViewRefProps } from "app/components/WebView";
import { atom, useAtom } from "jotai";
import { useDripsyTheme } from "dripsy";
import { isWeb } from "app/utils/constants";
import { IWebpageState } from "app/components/WebView/WebView";

export const modalizeRefAtom = atom<RefObject<Modalize> | null>(null);
export const setPayloadAtom = atom<any>({});
export const modalTypeAtom = atom<TModal>("web-view");

export const ModalController = ({ modalMaxWidth = 700 }) => {
	const ref = useRef<Modalize>(null);
	const [_m, setModalizeRef] = useAtom(modalizeRefAtom);
	const [payload, _s] = useAtom(setPayloadAtom);
	const [modalType, _mt] = useAtom(modalTypeAtom);
	useEffect(() => void setModalizeRef(ref), [ref, setModalizeRef]);

	const [webpageState, setWebpageState] = useState<IWebpageState>({
		url: "",
		secured: true,
		back: false,
		forward: false,
		progress: new Animated.Value(0),
	});
	const webViewRef = useRef<IWebViewRefProps>(null);
	const renderModal = () => {
		if (modalType === "web-view" && payload.src) {
			return (
				<WebView
					ref={webViewRef}
					src={payload.src}
					onWebpageStateChange={state => setWebpageState(state)}
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
			handleBack={webViewRef.current?.goBack}
			handleForward={webViewRef.current?.goForward}
			handleClose={ref?.current?.close}
			{...webpageState}
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
			rootStyle={{ backgroundColor: "#9994" }}
			scrollViewProps={{ keyboardShouldPersistTaps: "always" }}
		>
			{renderModal()}
		</Modalize>
	);
};
