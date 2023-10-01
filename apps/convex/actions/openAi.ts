"use node";
import { v } from "convex/values";
import { action } from "gconvex/_generated/server";
import { internal } from "gconvex/_generated/api";
import { aesCrypto } from "gconvex/crypto";
import { embed } from "gconvex/utils/openAi";

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
