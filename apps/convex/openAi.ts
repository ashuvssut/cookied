"use node";
import { v } from "convex/values";
import { action } from "gconvex/_generated/server";
import crypto from "crypto";

export const encryptOpenAiKey = action({
	args: { openAiKey: v.string() },
	handler: async (ctx, { openAiKey }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		try {
			const aes = aesCrypto();
			return aes.encrypt(openAiKey);
		} catch (err: any) {
			const msg = err.message || err.toString();
			throw new Error("Error encrypting API key: " + msg);
		}
	},
});

export const aiSearchSimilarBms = action({
	args: { descriptionQuery: v.string(), encApiKey: v.string() },
	handler: async (ctx, { descriptionQuery, encApiKey }) => {
		const embedding = await embed(descriptionQuery, encApiKey);
		const results = await ctx.vectorSearch("bookmarks", "by_embedding", {
			vector: embedding,
			limit: 16,
		});
		const sortedResults = results.sort((a, b) => b._score - a._score);
		return sortedResults;
	},
});

export async function embed(
	text: string,
	encApiKey: string,
): Promise<number[]> {
	const key = decryptKey(encApiKey);
	const req = { input: text, model: "text-embedding-ada-002" };
	const resp = await fetch("https://api.openai.com/v1/embeddings", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${key}`,
		},
		body: JSON.stringify(req),
	});
	if (!resp.ok) {
		const msg = await resp.text();
		throw new Error(`OpenAI API error: ${msg}`);
	}
	const json = await resp.json();
	const vector = json["data"][0]["embedding"];
	console.log(`Computed embedding of "${text}": ${vector.length} dimensions`);
	return vector;
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

// Crypto
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
