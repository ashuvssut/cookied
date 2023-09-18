import { defineSchema, defineTable } from "convex/server";
import { ObjectType, v } from "convex/values";

export const parentIdSchema = v.union(v.id("folders"), v.literal("root"))
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
};
export type TBm = ObjectType<typeof bookmarksCols>;

export default defineSchema({
	folders: defineTable(foldersCols) //
		.searchIndex("by_userId", { searchField: "userId" }),
	bookmarks: defineTable(bookmarksCols) //
		.searchIndex("by_userId", { searchField: "userId" }),
});
