import { IFolder } from "app/store/slices/bmShelfSlice";
import { Models } from "appwrite";

export type TFolderDocument = Models.Document & IFolder;
export function cleanResponse<T extends Models.Document>(response: T) {
	const { $collectionId, $permissions, $userId, $databaseId, ...rest } =
		response;
	return rest;
}

export function cleanResponseIterative<
	T extends Models.DocumentList<Models.Document>,
>(response: T) {
	return response.documents.map(res => cleanResponse(res));
}
