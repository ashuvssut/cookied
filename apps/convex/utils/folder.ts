import { Id } from "gconvex/_generated/dataModel";
import { TFl, TFlUpd } from "gconvex/schema";
import { TMutationCtx } from "gconvex/types";

export async function getDeletionList(
	ctx: TMutationCtx,
	bmList: Id<"bookmarks">[],
	flList: Id<"folders">[],
) {
	async function collectFolderIds(folderId: Id<"folders">) {
		const flDoc = await ctx.db.get(folderId);
		if (!flDoc) {
			flList = flList.filter(item => item !== folderId);
			return;
		}

		// Collect bookmark IDs from the current folder
		bmList.push(...flDoc.bookmarks);

		// Recursively collect folder IDs from subfolders
		for (const subfolderId of flDoc.folders) {
			flList.push(subfolderId);
			await collectFolderIds(subfolderId);
		}
	}

	for (const folderId of flList) await collectFolderIds(folderId);

	return { bmList, flList };
}

export const handleFlUpdate = async (
	ctx: TMutationCtx,
	userId: string | undefined,
	flId: TFlUpd["flId"],
	updates: TFlUpd["updates"],
) => {
	const existingFl = await ctx.db.get(flId);

	if (!existingFl) throw new Error("Folder not found");
	if (existingFl.userId !== userId) throw new Error("Unauthorized");

	return ctx.db.patch(flId, updates);
};

export async function handleCreateFl(
	ctx: TMutationCtx,
	newFl: TFl,
	userId: string,
) {
	const title = newFl.title.trim();
	const flId = await ctx.db.insert("folders", { ...newFl, title });

	// update parent Fl
	const parentFlId = newFl.parentId;
	if (parentFlId !== "root") {
		const parentFl = await ctx.db.get(parentFlId);
		if (parentFl) {
			const { _creationTime, _id, userId: _, ...updData } = parentFl;

			const updates = { ...updData, folders: [...updData.folders, flId] };
			await handleFlUpdate(ctx, userId, parentFlId, updates);
		}
	}
	return flId;
}

export async function createBmParentFls(
	ctx: TMutationCtx,
	flTitleArr: string[],
	userId: string,
) {
	const firstTitle = flTitleArr[0];
	// if (!firstTitle) return "root";
	if (!firstTitle) throw new Error("Cannot create a Bookmark without a folder");

	const firstFl = await ctx.db
		.query("folders")
		.withIndex("by_level", q =>
			q
				.eq("userId", userId)
				.eq("level", 0)
				.eq("title", firstTitle)
				.eq("parentId", "root"),
		)
		.unique();
	if (!firstFl) {
		console.info(
			`Root Folder with title ${firstTitle} not found. Creating one.`,
		);

		// Recursively create folders
		const lastFlId = await createFolderRecursive(
			ctx,
			flTitleArr,
			userId,
			0, // Start from level 0 for the root folder
			"root", // Use "root" as parentId for the root folder
			["root"], // updated path of the to-be-created folder
		);

		// Once the folders are created, return the folder ID
		return lastFlId;
	} else {
		// The root folder already exists, proceed to create child folders
		const lastFlId = await createFolderRecursive(
			ctx,
			flTitleArr,
			userId,
			1, // Start from level 1 since level 0 is the existing root folder
			firstFl._id, // Use the ID of the existing root folder as parentId
			["root", firstFl._id], // updated path of the to-be-created folder
		);

		// Return the last folder ID
		return lastFlId;
	}
}

async function createFolderRecursive(
	ctx: TMutationCtx,
	flTitleArr: string[],
	userId: string,
	level: number,
	parentId: Id<"folders"> | "root",
	path: string[],
): Promise<Id<"folders">> {
	const currentTitle = flTitleArr[level];

	if (!currentTitle) {
		// All folders are created, return the last folder's ID
		return parentId as Id<"folders">;
	}

	const existingFolder = await ctx.db
		.query("folders")
		.withIndex("by_level", q =>
			q
				.eq("userId", userId)
				.eq("level", level)
				.eq("title", currentTitle)
				.eq("parentId", parentId),
		)
		.unique();

	if (!existingFolder) {
		console.info(`Folder with title ${currentTitle} not found. Creating one.`);

		const newFolder: TFl = {
			bookmarks: [],
			folders: [],
			level,
			parentId,
			path,
			title: currentTitle,
			type: "folder",
			userId,
		};

		const folderId = await handleCreateFl(ctx, newFolder, userId);
		return createFolderRecursive(ctx, flTitleArr, userId, level + 1, folderId, [
			...newFolder.path,
			folderId,
		]);
	} else {
		// Folder already exists, proceed to the next level
		return createFolderRecursive(
			ctx,
			flTitleArr,
			userId,
			level + 1,
			existingFolder._id,
			[...existingFolder.path, existingFolder._id],
		);
	}
}
