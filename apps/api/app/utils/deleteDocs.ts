import { Databases } from "node-appwrite";

export async function deleteDocs(
	db: Databases,
	dbId: string,
	collId: string,
	pass = 1,
) {
	if (pass > 10) throw new Error("10 passes reached");

	const docListObj = await db.listDocuments(dbId, collId);

	const docList = docListObj.documents;

	docList.forEach(async doc => await db.deleteDocument(dbId, collId, doc.$id));

	const docListObj2 = await db.listDocuments(dbId, collId);
	let lastPass: number;
	if (docListObj2.documents.length > 0) {
		lastPass = await deleteDocs(db, dbId, collId, pass + 1);
	} else {
		console.log(`deleteDocs() pass count: ${pass}`);
		return pass;
	}

	return lastPass;
}
