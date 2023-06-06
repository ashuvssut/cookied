import { faker } from "@faker-js/faker";
import {
	IBookmark,
	IBookmarkState,
	IFolder,
} from "app/store/slices/bookmarkSlice";

function generateRandomBookmark(parentId: string | null): IBookmark {
	return {
		id: faker.string.uuid(),
		parentId: parentId || "",
		title: faker.word.words({ count: { min: 3, max: 5 } }),
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
		level,
		bookmarks: generateBookmarks(id),
		folders: generateFolders(id, level + 1),
		name: faker.word.words({ count: { min: 3, max: 5 } }),
		createdAt: faker.date.past().toISOString(),
		updatedAt: faker.date.recent().toISOString(),
	};
}

function generateBookmarks(parentId: string | null) {
	const bookmarks: IBookmark[] = [];
	const rand = Math.random() * (3 - 2) + 2;
	for (let i = 0; i < rand; i++) {
		bookmarks.push(generateRandomBookmark(parentId));
	}
	return bookmarks;
}

function generateFolders(parentId: string | null, level: number): IFolder[] {
	if (level > 3) return [];
	const folders: IFolder[] = [];
	const rand = Math.random() * (5 - 3) + 3;
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
