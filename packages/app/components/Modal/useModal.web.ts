// no-op for web
export function useModal() {
	return {
		onOpen: (_ = "") => undefined,
		closeModal: () => undefined,
		setModalType: () => undefined,
		setPayload: (_ = {}) => undefined,
		modalType: undefined,
		payload: undefined,
	};
}
