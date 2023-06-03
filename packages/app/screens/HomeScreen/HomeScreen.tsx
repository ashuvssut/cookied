import React from "react";
import { Text, Pressable } from "react-native";
import { Account, ID, Client } from "appwrite";
import { usePlatformAuth } from "app/hooks/usePlatformAuth";

export default function HomeScreen() {
	const { signOut } = usePlatformAuth()
	return (
		<Pressable
			// onPress={() => signOut()}
			onPress={async () => {
				// await fetch("http://localhost:3001/api/getDemoCookie")

				const client = new Client()
					.setEndpoint("https://cloud.appwrite.io/v1")
					.setProject("6469040898e19fe9052c");
				const account = new Account(client);
				const randomNum = Math.floor(Math.random() * 3000);
				const email = `abc${randomNum}@sds.ds`;
				const user = await account.create(
					ID.unique(),
					email,
					"aaaaaaaa",
					"asdffddfd",
				);
				console.log(user);
				const session = await account.createEmailSession(email, "aaaaaaaa");
				console.log(session);
				const user2 = await account.get();
				console.log(user2);
			}}
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>Sign Out</Text>
		</Pressable>
	);
}
