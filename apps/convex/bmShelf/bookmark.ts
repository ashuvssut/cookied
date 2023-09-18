import { query, mutation } from "gconvex/_generated/server";
import { v } from "convex/values";

export const create = mutation({
	args: {},
	handler: async (ctx, {}) => {
		await ctx.db.insert("bookmarks", {});
	},
});
