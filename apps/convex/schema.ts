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
	bookmarks: v.array(v.string()),
	folders: v.array(v.string()),
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
		.index("by_userId", ["userId"]),
	bookmarks: defineTable(bookmarksCols)
		.searchIndex("by_userId", {
			searchField: "userId",
			filterFields: ["embedding"],
		})
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
