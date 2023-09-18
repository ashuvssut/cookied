import { defineSchema, defineTable } from "convex/server";
import { ObjectType, v } from "convex/values";

export const foldersCols = {
	userId: v.string(),
	type: v.literal("folder"),
	parentId: v.string(),
	path: v.array(v.string()),
	level: v.number(),
	title: v.string(),
};
export type TFl = ObjectType<typeof foldersCols>;

export const bookmarksCols = {
	userId: v.string(),
	type: v.literal("bookmark"),
	parentId: v.string(),
	path: v.array(v.string()),
	level: v.number(),
	title: v.string(),
	url: v.string(),
};
export type TBm = ObjectType<typeof bookmarksCols>;

export default defineSchema({
	folders: defineTable(foldersCols).searchIndex("by_userId", {
		searchField: "userId",
	}),
	bookmarks: defineTable(bookmarksCols).searchIndex("by_userId", {
		searchField: "userId",
	}),
});
