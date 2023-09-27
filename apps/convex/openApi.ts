"use node";
import { v } from "convex/values";
import { action } from "gconvex/_generated/server";
import crypto from "crypto";

export const encryptOpenApiKey = action({
	args: { openApiKey: v.string() },
	handler: async (ctx, { openApiKey }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const encryptionKey = process.env.OPEN_API_SECRET;
		const iv = process.env.INIT_VECTOR;
		if (!encryptionKey || !iv)
			return new Error("Something went wrong during encryption.");
		const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
		let encryptedApiKey = cipher.update(openApiKey, "utf8", "hex");
		encryptedApiKey += cipher.final("hex");
		return encryptedApiKey;
	},
});

export const decryptKey = (
	encryptedKey: string,
	encryptionKey: string,
	iv: string,
) => {
	try {
		const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
		let decryptedApiKey = decipher.update(encryptedKey, "hex", "utf8");
		decryptedApiKey += decipher.final("utf8");
		return decryptedApiKey;
	} catch (error) {
		console.error("Error decrypting API key:", error);
		return null;
	}
};
