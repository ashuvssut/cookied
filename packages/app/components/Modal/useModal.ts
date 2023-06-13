import { modalTypeAtom, modalizeRefAtom, setPayloadAtom } from "./Modal";
import { useAtom } from "jotai";
import type { TModal } from ".";

export function useModal() {
	const [ref] = useAtom(modalizeRefAtom);
	const [modalType, setModalType] = useAtom(modalTypeAtom);
	const [payload, setPayload] = useAtom(setPayloadAtom);

	const onOpen = (type: TModal) => {
		setModalType(type);
		ref?.current?.open();
	};
	const closeModal = () => {
		ref?.current?.close();
	};

	return { onOpen, closeModal, setModalType, setPayload, modalType, payload };
}
