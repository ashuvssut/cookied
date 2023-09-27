import { OPENAPI_KEY } from "app/utils/constants";

export const storeEncryptedKey = async (key: string) => {
	localStorage.setItem(OPENAPI_KEY, key);
};

export const getEncryptedKey = async () => {
	return localStorage.getItem(OPENAPI_KEY);
};
