import { query, mutation } from "gconvex/_generated/server";
import { v } from "convex/values";
import { foldersCols } from "../schema";

export const get = query({
	args: {},
	handler: async (ctx, args) => {
		const messages = await ctx.db.query("folders").order("desc").take(100);
		// Reverse the list so that it's in a chronological order.
		return messages.reverse();
	},
});

export const create = mutation({
	args: foldersCols,
	handler: async (ctx, newFl) => {
		const identity = await ctx.auth.getUserIdentity();
		if (identity === null) throw new Error("Unauthenticated. Please Sign in.");
		const _id = await ctx.db.insert("folders", newFl);
		return { _id, ...newFl };
	},
});
