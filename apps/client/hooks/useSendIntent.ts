import { useCallback, useEffect, useState } from "react";
import ShareMenu from "react-native-share-menu";
import { ShareData } from "react-native-share-menu";
import { LogBox } from "react-native";

export const useSendIntent = () => {
	const [sharedData, setSharedData] = useState<string | string[]>("");
	const [sharedMimeType, setSharedMimeType] = useState("");
	const [sharedExtraData, setSharedExtraData] = useState<object | undefined>(
		undefined,
	);

	const handleShare = useCallback((item?: ShareData) => {
		if (!item) return;

		const { mimeType, data, extraData } = item;

		setSharedData(data);
		setSharedExtraData(extraData);
		setSharedMimeType(mimeType);
	}, []);

	useEffect(() => {
		ShareMenu.getInitialShare(handleShare);
	}, []);

	useEffect(() => {
		LogBox.ignoreLogs(["new NativeEventEmitter()"]);
		const listener = ShareMenu.addNewShareListener(handleShare);

		return () => {
			listener.remove();
		};
	}, []);

	return { sharedData, sharedMimeType, sharedExtraData };
};
