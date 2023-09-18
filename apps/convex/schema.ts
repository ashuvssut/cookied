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

export default defineSchema({
	folders: defineTable(foldersCols),
	bookmarks: defineTable({}),
});
