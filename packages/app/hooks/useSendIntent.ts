import { useCallback, useEffect, useState } from "react";
import ShareMenu, { ShareData } from "react-native-share-menu";
import { LogBox } from "react-native";

export const useSendIntent = () => {
	const [sharedData, setSharedData] = useState<ShareData["data"]>("");
	const [sharedMimeType, setSharedMimeType] =
		useState<ShareData["mimeType"]>("");
	const [sharedExtraData, setSharedExtraData] =
		useState<ShareData["extraData"]>(undefined);

	const handleShare = useCallback((item?: ShareData) => {
		if (!item) return;

		const { mimeType, data, extraData } = item;

		setSharedData(data);
		setSharedExtraData(extraData);
		setSharedMimeType(mimeType);
	}, []);

	useEffect(() => void ShareMenu.getInitialShare(handleShare), []);

	useEffect(() => {
		LogBox.ignoreLogs(["new NativeEventEmitter()"]);
		const listener = ShareMenu.addNewShareListener(handleShare);

		return () => listener.remove();
	}, []);

	return { sharedData, sharedMimeType, sharedExtraData };
};
