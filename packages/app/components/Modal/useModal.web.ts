// no-op for web
export function useModal() {
	return {
		onOpen: () => undefined,
		closeModal: () => undefined,
		setModalTyp: () => undefined,
		setPayload: () => undefined,
		modalType: undefined,
		payload: undefined,
	};
}
