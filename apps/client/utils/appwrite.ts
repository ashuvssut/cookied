import { Account, Client } from "appwrite";

export const client = new Client()
	.setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
	.setProject("6469040898e19fe9052c"); // Your project ID

export const account = new Account(client);
