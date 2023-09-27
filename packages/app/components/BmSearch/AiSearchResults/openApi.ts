import { OPENAPI_KEY } from "app/utils/constants";
import * as SecureStore from "expo-secure-store";

export const storeEncryptedKey = async (key: string) => {
	await SecureStore.setItemAsync(OPENAPI_KEY, key);
};

export const getEncryptedKey = async () => {
	return await SecureStore.getItemAsync(OPENAPI_KEY);
};

