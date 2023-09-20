import { useCallback } from "react";
import { useSendIntent } from "app/hooks/useSendIntent";
import { useFocusEffect } from "expo-router";
import { useModal } from "app/components/Modal";

export const WebpageViewer = () => {
	const { openModal } = useModal();
	const { sharedData } = useSendIntent();
	useFocusEffect(
		useCallback(() => {
			if (sharedData)
				openModal({
					type: "add-bookmark",
					payload: { sharedBmUrl: String(sharedData) },
				});
		}, [sharedData]),
	);

	return null;
};
