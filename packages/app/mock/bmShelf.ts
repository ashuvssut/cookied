import { faker } from "@faker-js/faker";
import {
	IBookmarkNode,
	IFolder,
	IFolderNode,
} from "app/store/slices/bmShelfSlice";
import _ from "lodash";

export function generateRandomBookmark(
	parentId: string,
	level: number,
	path: string[],
): IBookmarkNode {
	const id = faker.string.uuid();
	return {
		_id: id as any,
		parentId: parentId || ("" as any),
		type: "bookmark",
		path: [...path, id],
		level,
		title: faker.word.words({ count: { min: 3, max: 5 } }),
		// title: `bm ${level} ${id} - ${parentId}`,
		url: faker.internet.url(),
		// _createdAt: faker.date.past().toISOString(),
		// _updatedAt: faker.date.recent().toISOString(),
		_creationTime: new Date().toISOString(),
	};
}

export function generateRandomFolder(
	parentId: string,
	newLevel: number,
	path: string[],
	gen1 = false,
): IFolderNode {
	const id = faker.string.uuid();
	return {
		_id: id as any,
		parentId: parentId || ("" as any),
		type: "folder",
		path: [...path, id],
		level: newLevel,
		bookmarks: gen1 ? [] : generateBookmarks(id, newLevel, [...path]),
		folders: gen1 ? [] : generateFolders(id, newLevel + 1, [...path]),
		// title: `fl ${level} ${id} - ${parentId}`,
		title: faker.word.words({ count: { min: 3, max: 5 } }),
		// _createdAt: faker.date.past().toISOString(),
		// _updatedAt: faker.date.recent().toISOString(),
		_creationTime: new Date().toISOString(),
	};
}

const randRng = (u: number, l = 0) => Math.random() * (u - l) + l;

function generateBookmarks(parentId: string, level: number, path: string[]) {
	const bookmarks: IBookmarkNode[] = [];
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
): IFolderNode[] {
	if (level > 3) return [];
	const folders: IFolderNode[] = [];
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
		const { _id, level, path } = node;
		return generateRandomFolder(_id, level + 1, [...path, _id], true);
	}

	const flData = getFolderObj();
	const pathCopy = [...flData.path];
	pathCopy.pop();
	flData.path = pathCopy;
	const folderData = _.omit(
		flData, //
		["_updatedAt", "_createdAt", "_id", "bookmarks", "folders"],
	);

	return folderData;
}

export function generateBookmarkForApi(node: IFolder) {
	const { _id: parentId, level, path } = node;
	const bmObject = generateRandomBookmark(parentId, level, path);
	bmObject.path = [...path, parentId];
	const bookmarkData = _.omit(bmObject, ["_updatedAt", "_createdAt", "_id"]);
	return bookmarkData;
}
