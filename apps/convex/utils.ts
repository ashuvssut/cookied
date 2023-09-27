import { UserIdentity } from "convex/server";
import { TBmUpd } from "gconvex/schema";
// @ts-ignore
import crypto from "crypto";
import { generateSearchableText } from "gconvex/webContentUtils";

export function getUserId(identity: UserIdentity) {
	return identity.tokenIdentifier.split("|")[1]!;
}

export async function bmWithSearchTokens(bm: TBmUpd) {
	if (!bm.url) return bm;
	const searchableText = await generateSearchableText(bm.url);
	const searchTokens = tokenizeString(searchableText);
	const bmObj = { ...bm, searchTokens, searchableText };
	return bmObj;
}

export function tokenizeString(text: string) {
	const lines = text.split("\n");
	const lineTokens: string[] = [];
	for (const line of lines) {
		const trimmedLine = line.trim();
		if (trimmedLine !== "") lineTokens.push(trimmedLine);
	}
	return lineTokens;
}

// Crypto
export function aesCrypto() {
	function getEnv() {
		const encryptionKey = process.env.ENCRYPTION_KEY;
		const iv = process.env.INIT_VECTOR;
		const ivBuffer = Buffer.from(iv || "", "hex");
		if (!encryptionKey || !iv || ivBuffer.length !== 16) {
			throw new Error(
				"Something went wrong during encryption. check process.env",
			);
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
