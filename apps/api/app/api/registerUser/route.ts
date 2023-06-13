import { NextResponse } from "next/server";
import { Client, ID, Users } from "node-appwrite";

export async function POST(req: Request) {
	const client = new Client()
		.setEndpoint(process.env.APPWRITE_ENDPOINT!)
		.setProject(process.env.APPWRITE_PROJECT_ID!)
		.setKey(process.env.APPWRITE_SERVER_KEY!);

	const users = new Users(client);

	try {
		const { email, password, name } = await req.json();
		const user = await users.create(ID.unique(), email, "", password, name);
		return NextResponse.json({ user });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: e });
	}
}

/*

import { Client, ID, Account } from "appwrite";
 		const account = new Account(client);
		// Register user
		const res = await req.json();
		const { email, password, name } = res;
		const user = await account.create(ID.unique(), email, password, name);

		// Create a new session
		const session = await account.createEmailSession(email, password);
		console.log(JSON.stringify(session, null, 2));
		console.log("user", user);

		const jwt = await account.createJWT();
		console.log("jwt", jwt);

		return NextResponse.json({ user, session });
 */
