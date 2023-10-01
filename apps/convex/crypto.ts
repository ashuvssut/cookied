"use node";
import crypto from "crypto";
export function aesCrypto() {
	function getEnv() {
		const encryptionKey = process.env.ENCRYPTION_KEY;
		const iv = process.env.INIT_VECTOR;
		const ivBuffer = Buffer.from(iv || "", "hex");
		if (!encryptionKey || !iv || ivBuffer.length !== 16) {
			throw new Error("Something went wrong! Please check process.env");
		}
		const encKeyBuffer = Buffer.from(encryptionKey, "hex");
		return { encryptionKey, encKeyBuffer, iv, ivBuffer };
	}
	const AES_CBC = "aes-256-cbc";
	function encrypt(str: string) {
		const { encKeyBuffer, ivBuffer } = getEnv();
		const cipher = crypto.createCipheriv(AES_CBC, encKeyBuffer, ivBuffer);
		let encryptedStr = cipher.update(str, "utf8", "hex");
		encryptedStr += cipher.final("hex");
		return encryptedStr;
	}
	function decrypt(encStr: string) {
		const { encKeyBuffer, ivBuffer } = getEnv();
		const decipher = crypto.createDecipheriv(AES_CBC, encKeyBuffer, ivBuffer);
		let decryptedStr = decipher.update(encStr, "hex", "utf8");
		decryptedStr += decipher.final("utf8");
		return decryptedStr;
	}
	return { encrypt, decrypt };
}

export const decryptKey = (encryptedKey: string) => {
	try {
		const aes = aesCrypto();
		return aes.decrypt(encryptedKey);
	} catch (err: any) {
		const msg = err.message || err.toString();
		throw new Error("Error decrypting API key: " + msg);
	}
};
