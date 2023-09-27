import { getEncryptedKey, storeEncryptedKey } from "app/components/BmSearch/AiSearchResults/openAi";
import { Toast } from "app/components/Toast";
import { useAction } from "convex/react";
import { api } from "gconvex/_generated/api";
import { useEffect, useState } from "react";

export function useOpenAi() {
	const [encryptedKey, setEncryptedKey] = useState<string | null>(null);
	useEffect(() => {
		async function setKey() {
			if (encryptedKey) await storeEncryptedKey(encryptedKey);
		}
		setKey();
	}, [encryptedKey]);

	useEffect(() => {
		async function getKey() {
			const encKey = await getEncryptedKey();
			if (!!encKey) setEncryptedKey(encKey);
		}
		getKey();
	}, []);

	const encryptOpenAiKey = useAction(api.openAi.encryptOpenAiKey);
	async function submitApiKey(key: string) {
		try {
			const encKey = await encryptOpenAiKey({ openAiKey: key });
			if (typeof encKey === "string" && !!encKey) setEncryptedKey(encKey);
		} catch (err: any) {
			const msg = err.message || err.toString();
			console.error("Error when submitting API KEY", msg);
			Toast.error(`Error when submitting API KEY : ${msg}`);
		}
	}

	return { encryptedKey: encryptedKey ?? null, submitApiKey };
}
