import { faker } from "@faker-js/faker";

export interface IBookmark {}

function generateRandomBookmarks() {
	const bookmarks: IBookmark[] = [];
	for (let i = 0; i < 10; i++) {
		bookmarks.push({});
	}
	return bookmarks;
}

export const bookmarkState = generateRandomBookmarks();
