import { useCallback } from "react";
import { Text } from "dripsy";
import { TouchableOpacity } from "react-native";
import { useSendIntent } from "app/hooks/useSendIntent";
import { useFocusEffect } from "expo-router";
import { useModal } from "app/components/Modal";
import { useAtom } from "jotai";
import { activeUrlAtom } from "app/screens/HomeScreen/TreePanel";

export const WebpageViewer = () => {
	const { onOpen, setPayload } = useModal();
	const { sharedData } = useSendIntent();
	useFocusEffect(
		useCallback(() => {
			setPayload({ sharedData });
			if (sharedData) onOpen("add-bookmark");
		}, [sharedData]),
	);
	const [src] = useAtom(activeUrlAtom);
	return (
		<>
			<TouchableOpacity
				activeOpacity={0.75}
				onPress={() => {
					setPayload({ src });
					onOpen("web-view");
				}}
				style={{ position: "absolute", top: 100 }}
			>
				<Text>Open the modal</Text>
			</TouchableOpacity>
		</>
	);
};
