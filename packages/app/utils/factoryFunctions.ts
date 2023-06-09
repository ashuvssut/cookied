import { Models } from "appwrite";
import _ from "lodash";

export function cleanResponse<T extends {}>(response: T) {
	// const { $collectionId, $permissions, $userId, $databaseId, ...rest } =
	// 	response;
	const lodashOmit = ["$collectionId", "$permissions", "$userId", "$databaseId"] 
	const cleanRes = _.omit(response, lodashOmit) 
	type TCleanRes = Required<typeof cleanRes>;
	return cleanRes as TCleanRes;
}

export function cleanResponseIterative<
	T extends Models.DocumentList<Models.Document>,
>(response: T) {
	return response.documents.map(res => cleanResponse(res));
}
