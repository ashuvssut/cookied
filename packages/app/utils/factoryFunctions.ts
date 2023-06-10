import { Models } from "appwrite";
import _ from "lodash";

export function cleanResponse<T extends Models.Document>(response: T) {
	const cleanRes = _.omit(
		response, //
		["$collectionId", "$permissions", "$userId", "$databaseId"],
	);
	return cleanRes as T;
}

export function cleanResponseIterative<T extends Models.Document[]>(
	response: T,
) {
	return response.map((res: T[number]) => cleanResponse(res));
}
