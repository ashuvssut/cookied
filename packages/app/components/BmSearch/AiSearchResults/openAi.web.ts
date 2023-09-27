import { OPENAI_KEY } from "app/utils/constants";

export const storeEncryptedKey = async (key: string) => {
	localStorage.setItem(OPENAI_KEY, key);
};

export const getEncryptedKey = async () => {
	return localStorage.getItem(OPENAI_KEY);
};
