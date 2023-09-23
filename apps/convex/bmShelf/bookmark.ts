import { query, mutation } from "gconvex/_generated/server";
import { v } from "convex/values";
import { bookmarksCols, parentIdSchema } from "../schema";
import { getUserId } from "gconvex/utils";
import { handleFlUpdate } from "gconvex/bmShelf/folder";

export const getAll = query({
	handler: async ctx => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const userId = getUserId(identity);
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
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");
		const bmId = await ctx.db.insert("bookmarks", newBm);

		// update parent Fl
		const parentFlId = newBm.parentId;
		console.log(parentFlId);
		if (parentFlId !== "root") {
			const parentFl = await ctx.db.get(parentFlId);
			if (parentFl) {
				const userId = getUserId(identity);
				const { _creationTime, _id, userId: _, ...updData } = parentFl;

				const updates = { ...updData, bookmarks: [...updData.bookmarks, bmId] };
				await handleFlUpdate(ctx, userId, parentFlId, updates);
			}
		}

		return { _id: bmId, ...newBm };
	},
});

export const remove = mutation({
	args: { bmId: v.id("bookmarks") },
	handler: async (ctx, { bmId }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");
		await ctx.db.delete(bmId);
		return bmId;
	},
});

export const update = mutation({
	args: {
		bmId: v.id("bookmarks"),
		updates: v.object({
			type: v.literal("bookmark"),
			parentId: v.optional(parentIdSchema),
			path: v.optional(v.array(v.string())),
			level: v.optional(v.number()),
			title: v.optional(v.string()),
			url: v.optional(v.string()),
		}),
	},
	handler: async (ctx, { bmId, updates }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const userId = getUserId(identity);
		const existingBm = await ctx.db.get(bmId);

		if (!existingBm) throw new Error("Bookmark not found");
		if (existingBm.userId !== userId) throw new Error("Unauthorized");

		await ctx.db.patch(bmId, updates);
		return { _id: bmId, ...updates };
	},
});
