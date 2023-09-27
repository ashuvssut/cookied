"use node";
import { v } from "convex/values";
import { action } from "gconvex/_generated/server";
import { aesCrypto } from "gconvex/utils";

export const encryptOpenAiKey = action({
	args: { openAiKey: v.string() },
	handler: async (ctx, { openAiKey }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const aes = aesCrypto();
		return aes.encrypt(openAiKey);
	},
});

export const decryptKey = (encryptedKey: string) => {
	try {
		const aes = aesCrypto();
		return aes.decrypt(encryptedKey);
	} catch (err: any) {
		const msg = err.message || err.toString();
		console.error("Error decrypting API key:", msg);
		throw new Error("Error decrypting API key: " + msg);
	}
};
