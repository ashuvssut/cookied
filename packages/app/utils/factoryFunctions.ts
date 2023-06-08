export const folderFactory = response => {
	return {
		$id: response.$id,
		type: response.type,
		parentId: response.parentId,
		path: response.path,
		bookmarks: [],
		folders: [],
		level: response.level,
		title: response.title,
		$createdAt: response.$createdAt,
		$updatedAt: response.$updatedAt,
	};
};

export const bookmarkFactory = response => {
	return {
		$id: response.$id,
		type: response.type,
		url:response.url,
		parentId: response.parentId,
		path: response.path,
		level: response.level,
		title: response.title,
		$createdAt: response.$createdAt,
		$updatedAt: response.$updatedAt,
	};
};

