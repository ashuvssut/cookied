import { useSendIntent } from "app/hooks/useSendIntent";
import { useModal } from "app/components/Modal";

export const WebpageViewer = () => {
	const { openModal } = useModal();
	useSendIntent(({ data: sharedData }) => {
		openModal({
			type: "add-bookmark",
			payload: { sharedBmUrl: String(sharedData) },
		});
	});

	return null;
};
