import { IFolder } from "app/store/slices/bmShelfSlice";
import { modalizeRefAtom } from "./ModalController";
import { atom, useAtom } from "jotai";

type ActionType<T> = T extends { type: infer U } ? U : never;

type TWebviewAction = { type: "web-view"; payload: { src: string } };
type TAddBookmarkAction = {
	type: "add-bookmark";
	payload: { sharedBmUrl: string | null };
};
type TAddFolderAction = {
	type: "add-folder";
	payload: { parentFl: IFolder | null };
};

type ModalActions = TWebviewAction | TAddBookmarkAction | TAddFolderAction;
export type TModalType = ActionType<ModalActions>;

const modalTypeAtom = atom<TModalType>("web-view");
const webviewPayloadAtom = atom<TWebviewAction["payload"]>({ src: "" });
const addBmPayloadAtom = //
	atom<TAddBookmarkAction["payload"]>({ sharedBmUrl: "" });
const addFlPayloadAtom = //
	atom<TAddFolderAction["payload"]>({ parentFl: null }); // if parentFl === null, then it's a root folder (clicked addfl icon on treeview header)

export function useModal() {
	const [ref] = useAtom(modalizeRefAtom);
	const [modalType, setModalType] = useAtom(modalTypeAtom);
	const [webviewPayload, setWebviewPayload] = useAtom(webviewPayloadAtom);
	const [addBmPayload, setAddBmPayload] = useAtom(addBmPayloadAtom);
	const [addFlPayload, setAddFlPayload] = useAtom(addFlPayloadAtom);

	function openModal(action: ModalActions) {
		setModalType(action.type);
		switch (action.type) {
			case "web-view":
				setWebviewPayload(action.payload);
				break;
			case "add-bookmark":
				setAddBmPayload(action.payload);
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
		openModal,
		closeModal,
		modalType,
		webviewPayload,
		addBmPayload,
		addFlPayload,
	};
}
