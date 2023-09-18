import { query, mutation } from "gconvex/_generated/server";
import { v } from "convex/values";
import { foldersCols } from "../schema";

export const getAll = query({
	args: {},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const userId = identity.tokenIdentifier.split("|")[1];
		if (!userId) throw new Error("Unauthorized");

		const allFls = await ctx.db
			.query("folders")
			.withSearchIndex("by_userId", q => q.search("userId", userId))
			.collect();
		return allFls;
	},
});

export const create = mutation({
	args: foldersCols,
	handler: async (ctx, newFl) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");
		const _id = await ctx.db.insert("folders", newFl);
		return { _id, ...newFl };
	},
});

export const remove = mutation({
	args: { flId: v.id("folders") },
	handler: async (ctx, { flId }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (identity === null) throw new Error("Unauthenticated. Please Sign in.");
		await ctx.db.delete(flId);
		return flId;
	},
});

export const update = mutation({
	args: {
		flId: v.id("folders"),
		updates: v.object(foldersCols),
	},
	handler: async (ctx, { flId, updates }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const userId = identity.tokenIdentifier.split("|")[1];
		const existingFl = await ctx.db.get(flId);

		if (!existingFl) throw new Error("Folder not found");
		if (existingFl.userId !== userId) throw new Error("Unauthorized");

		await ctx.db.patch(flId, updates);
		return { _id: flId, ...updates };
	},
});
