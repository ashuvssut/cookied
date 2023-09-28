// contrib:- propose to add this hook in library
import { useCallback, useEffect, useState } from "react";
import ShareMenu, { ShareData } from "react-native-share-menu";

type TShareCallback = (shareData: ShareData) => void;
export const useSendIntent = (receiveShareCallback: TShareCallback) => {
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
		const listener = ShareMenu.addNewShareListener(handleShare);
		return () => listener.remove();
	}, []);

	const memoizedReceiveShareCallback = useCallback(
		() =>
			receiveShareCallback({
				data: sharedData,
				mimeType: sharedMimeType,
				extraData: sharedExtraData,
			}),
		[sharedData],
	);
	useEffect(() => {
		if (!sharedData) return;
		memoizedReceiveShareCallback();
		setSharedData("");
	}, [sharedData]);
};
