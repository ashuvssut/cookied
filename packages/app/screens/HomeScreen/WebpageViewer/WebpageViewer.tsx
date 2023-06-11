import { useCallback } from "react";
import { Text } from "dripsy";
import { TouchableOpacity } from "react-native";
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

	return (
		<>
			<TouchableOpacity
				activeOpacity={0.75}
				onPress={() => onOpen("web-view")}
				style={{ position: "absolute", top: 100 }}
			>
				<Text>Open the modal</Text>
			</TouchableOpacity>
		</>
	);
};
