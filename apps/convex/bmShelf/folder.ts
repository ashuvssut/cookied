import { query, mutation } from "gconvex/_generated/server";
import { v } from "convex/values";
import { flUpdSchema, foldersCols } from "../schema";
import { getUserId } from "gconvex/utils/user";
import {
	getDeletionList,
	handleCreateFl,
	handleFlUpdate,
} from "gconvex/utils/folder";

export const getAll = query({
	handler: async ctx => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const userId = getUserId(identity);
		if (!userId) throw new Error("Unauthorized");

		const allFls = await ctx.db
			.query("folders")
			.withIndex("by_userId", q => q.eq("userId", userId))
			.collect();
		return allFls;
	},
});

export const create = mutation({
	args: foldersCols,
	handler: async (ctx, newFl) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");
		const userId = getUserId(identity);
		const flId = await handleCreateFl(ctx, newFl, userId);

		return { _id: flId, ...newFl };
	},
});

export const remove = mutation({
	args: { flId: v.id("folders") },
	handler: async (ctx, { flId }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		// prepare deletion list recursively to delete all children Fl & Bm
		const deletionLists = await getDeletionList(ctx, [], [flId]);
		const allIdsToDelete = [...deletionLists.bmList, ...deletionLists.flList];
		const uniqueIdsToDelete = Array.from(new Set(allIdsToDelete));
		// console.log(uniqueIdsToDelete);

		const flDoc = await ctx.db.get(flId); // get flDoc, then do the deletions
		await Promise.all(uniqueIdsToDelete.map(id => ctx.db.delete(id)));

		// Update parent fl's folders array
		if (flDoc) {
			const parentId = flDoc.parentId;
			if (parentId !== "root") {
				const parentFlDoc = await ctx.db.get(parentId);
				if (parentFlDoc) {
					const folders = parentFlDoc.folders;
					const updatedFolders = folders.filter(id => id !== flId);
					const flUpdates = { ...parentFlDoc, folders: updatedFolders };
					ctx.db.patch(parentId, flUpdates);
				}
			}
		}

		return flId;
	},
});

export const update = mutation({
	args: flUpdSchema,
	handler: async (ctx, { flId, updates }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const userId = getUserId(identity);
		await handleFlUpdate(ctx, userId, flId, updates);
		return { _id: flId, ...updates };
	},
});
