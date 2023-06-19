import { modalizeRefAtom } from "./ModalController";
import { atom, useAtom } from "jotai";

type ActionType<T> = T extends { type: infer U } ? U : never;

type TWebviewAction = { type: "web-view"; payload: { src: "" } };
type TAddBookmarkAction = {
	type: "add-bookmark";
	payload: { sharedData: { url: "" } | null };
};
type TAddFolderAction = {
	type: "add-folder";
	payload: { parentId: string | null };
};

type ModalActions = TWebviewAction | TAddBookmarkAction | TAddFolderAction;
export type TModalType = ActionType<ModalActions>;

const modalTypeAtom = atom<TModalType>("web-view");
const webviewPayloadAtom = atom<TWebviewAction["payload"]>({ src: "" });
const addBmSendIntentPayloadAtom = //
	atom<TAddBookmarkAction["payload"]>({ sharedData: { url: "" } });
const addFlPayloadAtom = atom<TAddFolderAction["payload"]>({
	parentId: "",
});

export function useModal() {
	const [ref] = useAtom(modalizeRefAtom);
	const [modalType, setModalType] = useAtom(modalTypeAtom);
	const [webviewPayload, setWebviewPayload] = useAtom(webviewPayloadAtom);
	const [addBmSendIntentPayload, setAddBmSendIntentPayload] = useAtom(
		addBmSendIntentPayloadAtom,
	);
	const [addFlPayload, setAddFlPayload] = useAtom(addFlPayloadAtom);

	function onOpen(action: ModalActions) {
		setModalType(action.type);
		switch (action.type) {
			case "web-view":
				setWebviewPayload(action.payload);
				break;
			case "add-bookmark":
				setAddBmSendIntentPayload(action.payload);
				break;
			case "add-folder":
				setAddFlPayload(action.payload);
				break;
			default:
				throw new Error(`Unhandled modal action: ${action}`);
		}
		ref?.current?.open();
	}

	const closeModal = () => {
		ref?.current?.close();
	};

	return {
		onOpen,
		closeModal,
		modalType,
		webviewPayload,
		addBmSendIntentPayload,
		addFlPayload,
	};
}
