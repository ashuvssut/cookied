import { useCallback } from "react";
import { useSendIntent } from "app/hooks/useSendIntent";
import { useFocusEffect } from "expo-router";
import { useModal } from "app/components/Modal";

export const WebpageViewer = () => {
	const { onOpen, setPayload } = useModal();
	const { sharedData } = useSendIntent();
	useFocusEffect(
		useCallback(() => {
			setPayload({ sharedData });
			if (sharedData) onOpen("add-bookmark");
		}, [sharedData]),
	);

	return null;
};
