"use node";
import { v } from "convex/values";
import { action } from "gconvex/_generated/server";
import { internal } from "gconvex/_generated/api";
import { aesCrypto } from "gconvex/crypto";

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

export const updateEmbeddings = action({
	args: {
		docs: v.array(
			v.object({ _id: v.id("bookmarks"), searchableText: v.string() }),
		),
		encryptedKey: v.string(),
	},
	handler: async (ctx, { docs, encryptedKey }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		try {
			const docUpdatesPromises = docs.map(async doc => {
				const embedding = await embed(doc.searchableText, encryptedKey);
				return { _id: doc._id, embedding };
			});
			const docUpdates = await Promise.all(docUpdatesPromises);
			await ctx.runMutation(internal.bmShelf.bookmark.updateEmbeddingsMany, {
				docUpdates,
			});
		} catch (err: any) {
			const msg = err.message || err.toString();
			throw new Error("Error updating embeddings: " + msg);
		}
	},
});

export const aiSearchSimilarBms = action({
	args: { query: v.string(), encApiKey: v.string() },
	handler: async (ctx, { query, encApiKey }) => {
		const embedding = await embed(query, encApiKey);
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
	// console.log(`Computed embedding of "${text}": ${vector.length} dimensions`);
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
