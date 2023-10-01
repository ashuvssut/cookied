import {
	query,
	mutation,
	internalAction,
	internalMutation,
} from "gconvex/_generated/server";
import { v } from "convex/values";
import { TBm, bmUpdSchema } from "../schema";
import { internal } from "gconvex/_generated/api";
import { getUserId } from "gconvex/utils/user";
import { bmWithSearchFields } from "gconvex/utils/bookmark";
import { createBmParentFls, handleFlUpdate } from "gconvex/utils/folder";

export const getAll = query({
	handler: async ctx => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const userId = getUserId(identity);
		const allBms = await ctx.db
			.query("bookmarks")
			.withIndex("by_embedding_idx", q => q.eq("userId", userId))
			.collect();
		return allBms;
	},
});

export const create = mutation({
	args: { title: v.string(), url: v.string(), flPath: v.string() },
	handler: async (ctx, { title, flPath, url }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");
		const userId = getUserId(identity);

		const bmTitle = title.trim();
		const flTitleArr = flPath.split("/").map(t => t.trim());

		const bmParentFlId = await createBmParentFls(ctx, flTitleArr, userId);
		const parentFl = await ctx.db.get(bmParentFlId);
		if (!parentFl)
			throw new Error("Parent Folders of the Bookmark could not be created");
		const newBm: TBm = {
			level: parentFl.level,
			parentId: parentFl._id,
			path: parentFl.path,
			title: bmTitle,
			type: "bookmark",
			url,
			userId,
		};
		const bmId = await ctx.db.insert("bookmarks", newBm);
		const { userId: _, ...updates } = newBm;
		ctx.scheduler.runAfter(
			0,
			internal.bmShelf.bookmark.updBmWithSearchFields, // updates the bm
			{ bmId, bm: updates },
		);

		// update parent Fl of the newly created Bm
		const parentFlId = newBm.parentId;
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

		const bmDoc = await ctx.db.get(bmId); // get bmDoc, then do the deletion
		await ctx.db.delete(bmId);

		// Update parent fl's bookmarks array
		if (bmDoc) {
			const parentId = bmDoc.parentId;
			if (parentId !== "root") {
				const parentFlDoc = await ctx.db.get(parentId);
				if (parentFlDoc) {
					const bookmarks = parentFlDoc.bookmarks;
					const updatedBookmarks = bookmarks.filter(id => id !== bmId);
					const flUpdates = { ...parentFlDoc, bookmarks: updatedBookmarks };
					ctx.db.patch(parentId, flUpdates);
				}
			}
		}
		return bmId;
	},
});

export const update = mutation({
	args: { bmId: v.id("bookmarks"), updates: v.object(bmUpdSchema) },
	handler: async (ctx, { bmId, updates }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const userId = getUserId(identity);
		const existingBm = await ctx.db.get(bmId);

		if (!existingBm) throw new Error("Bookmark not found");
		if (existingBm.userId !== userId) throw new Error("Unauthorized");

		ctx.scheduler.runAfter(
			0,
			internal.bmShelf.bookmark.handleUpdate,
			{ bmId, updates }, //
		);
	},
});

export const handleUpdate = internalMutation({
	args: { bmId: v.id("bookmarks"), updates: v.object(bmUpdSchema) },
	handler: async (ctx, { bmId, updates }) => {
		const existingBm = await ctx.db.get(bmId);
		await ctx.db.patch(bmId, updates);
		if (!existingBm) return { _id: bmId, ...updates };

		const shouldRunUpdAction =
			updates.url !== existingBm.url || existingBm.searchTokens === undefined;
		if (shouldRunUpdAction) {
			ctx.scheduler.runAfter(
				0,
				internal.bmShelf.bookmark.updBmWithSearchFields,
				{ bmId, bm: updates },
			);
		}
		return { _id: bmId, ...updates };
	},
});

export const updBmWithSearchFields = internalAction({
	args: { bmId: v.id("bookmarks"), bm: v.object(bmUpdSchema) },
	handler: async (ctx, { bmId, bm }) => {
		async function getUpdatedBm() {
			// if (exisitingBm?.url) {
			// 	if (exisitingBm.url !== bm?.url || !exisitingBm.searchTokens) {
			// 		return await bmWithSearchTokens(bm);
			// 	} else return await bmWithSearchTokens(exisitingBm);
			// } else if (bm.url) {
			if (bm.url) return await bmWithSearchFields(bm);
			else throw new Error(`Exhaustive check: missing url in new Bm object`);
		}
		const updatedBm = await getUpdatedBm();

		await ctx.runMutation(internal.bmShelf.bookmark.handleUpdate, {
			bmId,
			updates: updatedBm,
		});
	},
});

export const getEmptyEmbeddingDocs = query({
	handler: async ctx => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const userId = getUserId(identity);
		const emptyFields = await ctx.db
			.query("bookmarks")
			.withIndex("by_embedding_idx", q =>
				q.eq("userId", userId).eq("embedding", []),
			)
			.collect();

		const docs = emptyFields.flatMap(f => {
			const { _id, searchableText } = f;
			if (searchableText !== "" && searchableText !== undefined)
				return [{ _id, searchableText }];
			return [];
		});

		return docs;
	},
});

export const updateEmbeddingsMany = internalMutation({
	args: {
		docUpdates: v.array(
			v.object({
				_id: v.id("bookmarks"),
				embedding: v.array(v.float64()),
			}),
		),
	},
	handler: async (ctx, { docUpdates }) => {
		const updatePromises = docUpdates.map(({ _id, embedding }) =>
			ctx.db.patch(_id, { embedding }),
		);
		await Promise.all(updatePromises);
	},
});
