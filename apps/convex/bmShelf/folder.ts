import { query, mutation } from "gconvex/_generated/server";
import { ObjectType, v } from "convex/values";
import { foldersCols, parentIdSchema } from "../schema";
import { GenericMutationCtx } from "convex/server";
import { getUserId } from "gconvex/utils";

export const getAll = query({
	handler: async ctx => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		const userId = getUserId(identity);
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
		const flId = await ctx.db.insert("folders", newFl);

		// update parent Fl
		const parentFlId = newFl.parentId;
		if (parentFlId !== "root") {
			const parentFl = await ctx.db.get(parentFlId);
			if (parentFl) {
				const userId = getUserId(identity);
				const { _creationTime, _id, userId: _, ...updData } = parentFl;

				const updates = { ...updData, folders: [...updData.folders, flId] };
				await handleFlUpdate(ctx, userId, parentFlId, updates);
			}
		}

		return { _id: flId, ...newFl };
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

const flUpdSchema = {
	flId: v.id("folders"),
	updates: v.object({
		type: v.literal("folder"),
		parentId: v.optional(parentIdSchema),
		path: v.optional(v.array(v.string())),
		level: v.optional(v.number()),
		title: v.optional(v.string()),
		bookmarks: v.optional(v.array(v.string())),
		folders: v.optional(v.array(v.string())),
	}),
};
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

type flUpdate = ObjectType<typeof flUpdSchema>;

export const handleFlUpdate = async (
	ctx: GenericMutationCtx<any>,
	userId: string | undefined,
	flId: flUpdate["flId"],
	updates: flUpdate["updates"],
) => {
	const existingFl = await ctx.db.get(flId);

	if (!existingFl) throw new Error("Folder not found");
	if (existingFl.userId !== userId) throw new Error("Unauthorized");

	return ctx.db.patch(flId, updates);
};
