import { NextResponse } from "next/server";
import { Client, Users } from "node-appwrite";

export async function POST(req: Request, res: Response) {
	const client = new Client()
		.setEndpoint(process.env.APPWRITE_ENDPOINT!)
		.setProject(process.env.APPWRITE_PROJECT_ID!)
		.setKey(process.env.APPWRITE_SERVER_KEY!);

	const users = new Users(client);

	try {
		const userListObj = await users.list();
		const userList = userListObj.users;
		userList.forEach(async user => {
			await users.delete(user.$id);
		});
		return NextResponse.json({ success: true });
	} catch (e: any) {
		console.error(e);
		return NextResponse.json({ error: e.message });
	}
}
