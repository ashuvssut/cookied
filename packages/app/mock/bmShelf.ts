import { faker } from "@faker-js/faker";
import { IBookmark, IFolder } from "app/store/slices/bmShelfSlice";
import _ from "lodash";

export function generateRandomBookmark(
	parentId: string,
	level: number,
	path: string[],
): IBookmark {
	const id = faker.string.uuid();
	return {
		$id: id,
		parentId: parentId || "",
		type: "bookmark",
		path: [...path, id],
		level,
		title: faker.word.words({ count: { min: 3, max: 5 } }),
		// title: `bm ${level} ${id} - ${parentId}`,
		url: faker.internet.url(),
		// $createdAt: faker.date.past().toISOString(),
		// $updatedAt: faker.date.recent().toISOString(),
		$createdAt: new Date().toISOString(),
		$updatedAt: new Date().toISOString(),
	};
}

export function generateRandomFolder(
	parentId: string,
	newLevel: number,
	path: string[],
	gen1 = false,
): IFolder {
	const id = faker.string.uuid();
	return {
		$id: id,
		parentId: parentId || "",
		type: "folder",
		path: [...path, id],
		level: newLevel,
		bookmarks: gen1 ? [] : generateBookmarks(id, newLevel, [...path]),
		folders: gen1 ? [] : generateFolders(id, newLevel + 1, [...path]),
		// title: `fl ${level} ${id} - ${parentId}`,
		title: faker.word.words({ count: { min: 3, max: 5 } }),
		// $createdAt: faker.date.past().toISOString(),
		// $updatedAt: faker.date.recent().toISOString(),
		$createdAt: new Date().toISOString(),
		$updatedAt: new Date().toISOString(),
	};
}

const randRng = (u: number, l = 0) => Math.random() * (u - l) + l;

function generateBookmarks(parentId: string, level: number, path: string[]) {
	const bookmarks: IBookmark[] = [];
	const rand = randRng(1, 0);
	for (let i = 0; i < rand; i++) {
		bookmarks.push(
			generateRandomBookmark(parentId, level, [...path, parentId]),
		);
	}
	return bookmarks;
}

function generateFolders(
	parentId: string,
	level: number,
	path: string[],
): IFolder[] {
	if (level > 3) return [];
	const folders: IFolder[] = [];
	// const rand = randRng(5, 3);
	const rand = randRng(2, 0);
	for (let i = 0; i < rand; i++) {
		const folder = generateRandomFolder(parentId, level, [...path, parentId]);
		folders.push(folder);
	}
	return folders;
}

function generateBookmarkState() {
	return { folders: generateFolders("root", 0, []) };
}
export const bookmarkState = generateBookmarkState();

// Random Generators for APIs
export function generateFolderForApi(node: IFolder | null) {
	function getFolderObj() {
		if (!node) return generateRandomFolder("root", 0, ["root"], true);
		const { $id, level, path } = node;
		return generateRandomFolder($id, level + 1, [...path, $id], true);
	}

	const flData = getFolderObj();
	const pathCopy = [...flData.path];
	pathCopy.pop();
	flData.path = pathCopy;
	const folderData = _.omit(
		flData, //
		["$updatedAt", "$createdAt", "$id", "bookmarks", "folders"],
	);

	return folderData;
}

export function generateBookmarkForApi(node: IFolder) {
	const { $id: parentId, level, path } = node;
	const bmObject = generateRandomBookmark(parentId, level, path);
	const pathCopy = [...path];
	pathCopy.pop();
	bmObject.path = pathCopy;
	const bookmarkData = _.omit(bmObject, ["$updatedAt", "$createdAt", "$id"]);
	return bookmarkData;
}
