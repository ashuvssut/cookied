import { NextResponse } from "next/server";
import { Client, Users } from "node-appwrite";

// curl --location --request POST 'http://localhost:2023/api/deleteAllUsers'

async function deleteUsers(users: Users, pass = 0) {
	if (pass > 10) throw new Error("10 passes reached");
	const userListObj = await users.list();
	const userList = userListObj.users;
	// await Promise.all(userList.map(user => users.delete(user.$id)));
	userList.forEach(async user => await users.delete(user.$id));

	let lastPass: number;
	if (userList.length > 0) {
		lastPass = await deleteUsers(users, pass + 1);
	} else {
		console.log(`deleteUsers() pass count: ${pass}`);
		return pass;
	}

	return lastPass;
}

export async function POST() {
	const client = new Client()
		.setEndpoint(process.env.APPWRITE_ENDPOINT!)
		.setProject(process.env.APPWRITE_PROJECT_ID!)
		.setKey(process.env.APPWRITE_SERVER_KEY!);

	const users = new Users(client);

	try {
		const passes = await deleteUsers(users);

		return NextResponse.json({ success: true, passes });
	} catch (e: any) {
		console.error(e);
		return NextResponse.json({ error: e.message });
	}
}
