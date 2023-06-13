import { deleteDocs } from "@/app/utils/deleteDocs";
import { NextResponse } from "next/server";
import { Client, Databases } from "node-appwrite";

// curl --location --request POST 'http://localhost:2023/api/deleteAllFls'
export async function POST() {
	const client = new Client()
		.setEndpoint(process.env.APPWRITE_ENDPOINT!)
		.setProject(process.env.APPWRITE_PROJECT_ID!)
		.setKey(process.env.APPWRITE_SERVER_KEY!);

	const db = new Databases(client);

	try {
		const passes = await deleteDocs(
			db,
			process.env.APPWRITE_DATABASE_ID!,
			process.env.APPWRITE_FOLDER_COLLECTION_ID!,
		);

		return NextResponse.json({ success: true, passes });
	} catch (e: any) {
		console.error(e);
		return NextResponse.json({ error: e.message });
	}
}
