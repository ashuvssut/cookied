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

export const update = mutation({
	args: {
		bmId: v.id("bookmarks"),
		updates: v.object(bookmarksCols),
	},
	handler: async (ctx, { bmId, updates }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const userId = identity.tokenIdentifier.split("|")[1];
		const existingBm = await ctx.db.get(bmId);

		if (!existingBm) throw new Error("Bookmark not found");
		if (existingBm.userId !== userId) throw new Error("Unauthorized");

		await ctx.db.patch(bmId, updates);
		return { _id: bmId, ...updates };
	},
});
