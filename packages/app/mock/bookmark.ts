import { faker } from "@faker-js/faker";
import {
	IBookmark,
	IBookmarkState,
	IFolder,
} from "app/store/slices/bookmarkSlice";

function getShortId(id: string | null) {
	if (!id) return "root";
	return id.split("-")[0];
}
function getPathId(type: string, level: number, parentId: string | null) {
	const id = getShortId(parentId);
	return `${type}-${level}-${id}`;
}

function generateRandomBookmark(
	parentId: string | null,
	level: number,
): IBookmark {
	const id = faker.string.uuid();
	return {
		id,
		parentId: parentId || "",
		pathId: getPathId("bm", level, parentId),
		level,
		title: faker.word.words({ count: { min: 3, max: 5 } }),
		// title: `bm ${level} ${id} - ${parentId}`,
		url: faker.internet.url(),
		createdAt: faker.date.past().toISOString(),
		updatedAt: faker.date.recent().toISOString(),
	};
}

function generateRandomFolder(parentId: string | null, level: number): IFolder {
	const id = faker.string.uuid();
	return {
		id,
		parentId: parentId || "",
		pathId: getPathId("fl", level, parentId),
		level,
		bookmarks: generateBookmarks(id, level),
		folders: generateFolders(id, level + 1),
		title: faker.word.words({ count: { min: 3, max: 5 } }),
		// title: `fl ${level} ${id} - ${parentId}`,
		createdAt: faker.date.past().toISOString(),
		updatedAt: faker.date.recent().toISOString(),
	};
}

const randRng = (u: number, l = 0) => Math.random() * (u - l) + l;

function generateBookmarks(parentId: string | null, level: number) {
	const bookmarks: IBookmark[] = [];
	const rand = randRng(3, 2);
	for (let i = 0; i < rand; i++) {
		bookmarks.push(generateRandomBookmark(parentId, level));
	}
	return bookmarks;
}

function generateFolders(parentId: string | null, level: number): IFolder[] {
	if (level > 3) return [];
	const folders: IFolder[] = [];
	const rand = randRng(5, 3);
	for (let i = 0; i < rand; i++) {
		const folder = generateRandomFolder(parentId, level);
		folders.push(folder);
	}
	return folders;
}

function generateBookmarkState(): IBookmarkState {
	const level = 0;
	return { folders: generateFolders(null, level) };
}
export const bookmarkState = generateBookmarkState();
