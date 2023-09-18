import { query, mutation } from "gconvex/_generated/server";
import { v } from "convex/values";
import { bookmarksCols } from "../schema";

export const getAll = query({
	args: {},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (identity === null) throw new Error("Unauthenticated. Please Sign in.");

		const userId = identity.tokenIdentifier;
		const allBms = await ctx.db
			.query("bookmarks")
			.withSearchIndex("by_userId", q => q.search("userId", userId))
			.collect();
		return allBms;
	},
});

export const create = mutation({
	args: bookmarksCols,
	handler: async (ctx, newBm) => {
		const identity = await ctx.auth.getUserIdentity();
		if (identity === null) throw new Error("Unauthenticated. Please Sign in.");
		const _id = await ctx.db.insert("bookmarks", newBm);
		return { _id, ...newBm };
	},
});

export const remove = mutation({
	args: { bmId: v.id("bookmarks") },
	handler: async (ctx, { bmId }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (identity === null) throw new Error("Unauthenticated. Please Sign in.");
		await ctx.db.delete(bmId);
		return bmId;
	},
});
