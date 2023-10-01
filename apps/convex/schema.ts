import { defineSchema, defineTable } from "convex/server";
import { ObjectType, v } from "convex/values";

export const parentIdSchema = v.union(v.id("folders"), v.literal("root"));
export const foldersCols = {
	userId: v.string(),
	type: v.literal("folder"),
	parentId: parentIdSchema,
	path: v.array(v.string()),
	level: v.number(),
	title: v.string(),
	bookmarks: v.array(v.id("bookmarks")),
	folders: v.array(v.id("folders")),
};
export type TFl = ObjectType<typeof foldersCols>;

export const bookmarksCols = {
	userId: v.string(),
	type: v.literal("bookmark"),
	parentId: parentIdSchema,
	path: v.array(v.string()),
	level: v.number(),
	title: v.string(),
	url: v.string(),
	searchTokens: v.optional(v.array(v.string())),
	searchableText: v.optional(v.string()),
	embedding: v.optional(v.array(v.float64())),
};
export type TBm = ObjectType<typeof bookmarksCols>;

export default defineSchema({
	folders: defineTable(foldersCols) //
		.index("by_userId", ["userId"])
		.index("by_level", ["userId", "level", "title", "parentId"]),
	bookmarks: defineTable(bookmarksCols)
		.index("by_embedding_idx", ["userId", "embedding"])
		.vectorIndex("by_embedding", {
			vectorField: "embedding",
			dimensions: 1536,
			filterFields: ["searchableText"],
		}),
});

export const bmUpdSchema = {
	type: v.literal("bookmark"),
	parentId: v.optional(parentIdSchema),
	path: v.optional(v.array(v.string())),
	level: v.optional(v.number()),
	title: v.optional(v.string()),
	url: v.optional(v.string()),
	searchTokens: v.optional(v.array(v.string())),
	searchableText: v.optional(v.string()),
	embedding: v.optional(v.array(v.float64())),
	// userId is prohibited to change!
};
export type TBmUpd = ObjectType<typeof bmUpdSchema>;

export const flUpdSchema = {
	flId: v.id("folders"),
	updates: v.object({
		type: v.literal("folder"),
		parentId: v.optional(parentIdSchema),
		path: v.optional(v.array(v.string())),
		level: v.optional(v.number()),
		title: v.optional(v.string()),
		bookmarks: v.optional(v.array(v.id("bookmarks"))),
		folders: v.optional(v.array(v.id("folders"))),
	}),
};
export type TFlUpd = ObjectType<typeof flUpdSchema>;
