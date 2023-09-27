import { OPENAI_KEY } from "app/utils/constants";
import * as SecureStore from "expo-secure-store";

export const storeEncryptedKey = async (key: string) => {
	await SecureStore.setItemAsync(OPENAI_KEY, key);
};

export const getEncryptedKey = async () => {
	return await SecureStore.getItemAsync(OPENAI_KEY);
};

