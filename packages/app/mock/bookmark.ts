import { faker } from "@faker-js/faker";
import { IBookmark, IFolder } from "app/store/slices/bookmarkSlice";

// function getPathId(type: string, level: number, parentId: string) {
// 	return `${type}#${level}#${parentId}`;
// }

function generateRandomBookmark(
	parentId: string,
	level: number,
	path: string[],
): IBookmark {
	const id = faker.string.uuid();
	return {
		id,
		parentId: parentId || "",
		type: "bookmark",
		path: [...path, id],
		level,
		title: faker.word.words({ count: { min: 3, max: 5 } }),
		// title: `bm ${level} ${id} - ${parentId}`,
		url: faker.internet.url(),
		createdAt: faker.date.past().toISOString(),
		updatedAt: faker.date.recent().toISOString(),
	};
}

function generateRandomFolder(
	parentId: string,
	level: number,
	path: string[],
): IFolder {
	const id = faker.string.uuid();
	return {
		id,
		parentId: parentId || "",
		type: "folder",
		path: [...path, id],
		level,
		bookmarks: generateBookmarks(id, level, path),
		folders: generateFolders(id, level + 1, path),
		title: faker.word.words({ count: { min: 3, max: 5 } }),
		// title: `fl ${level} ${id} - ${parentId}`,
		createdAt: faker.date.past().toISOString(),
		updatedAt: faker.date.recent().toISOString(),
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
	const level = 0;
	return { folders: generateFolders("root", level, []) };
}
export const bookmarkState = generateBookmarkState();
