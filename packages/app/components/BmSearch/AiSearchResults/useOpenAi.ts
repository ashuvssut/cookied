import {
	getEncryptedKey,
	storeEncryptedKey,
} from "app/components/BmSearch/AiSearchResults/openAi";
import { barLoadingAtom } from "app/store/slices/compoState";
import { Toast } from "app/components/Toast";
import { useAction } from "convex/react";
import { api } from "gconvex/_generated/api";
import { useAtom } from "jotai";
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

	const [, setLoading] = useAtom(barLoadingAtom);
	const encryptOpenAiKey = useAction(api.actions.openAi.encryptOpenAiKey);
	async function submitApiKey(key: string) {
		try {
			setLoading(true);
			const isValid = await validateOpenAiKey(key);
			if (isValid) {
				const encKey = await encryptOpenAiKey({ openAiKey: key });
				if (typeof encKey === "string" && !!encKey) {
					setEncryptedKey(encKey);
					Toast.success("API key saved locally until logout.");
				}
			}
		} catch (err: any) {
			const msg = err.message || err.toString();
			console.error("Error when submitting API KEY", msg);
			Toast.error(`Error when submitting API KEY : ${msg}`);
		}
		setLoading(false);
	}

	return { encryptedKey: encryptedKey ?? null, submitApiKey };
}

async function validateOpenAiKey(key: string) {
	const apiUrl = "https://api.openai.com/v1/engines";
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${key}`,
	};

	try {
		const response = await fetch(apiUrl, { method: "GET", headers: headers });
		const data = await response.json();
		if (!response.ok)
			throw new Error(`Error: ${response.status}, ${data.error.message}`);

		return true;
	} catch (error: any) {
		console.error("Error:", error.message);
		Toast.error(error.message);
		return false;
	}
}
