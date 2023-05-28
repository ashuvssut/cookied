import { Account, Client } from "appwrite";
import Constants from "expo-constants";

export const APPWRITE_ENDPOINT = Constants.expoConfig?.extra?.APPWRITE_ENDPOINT;
if (!APPWRITE_ENDPOINT)
	throw Error("APPWRITE_ENDPOINT is not set in .env (Refer .env.example)");

export const APPWRITE_PROJECT_ID =
	Constants.expoConfig?.extra?.APPWRITE_PROJECT_ID;
if (!APPWRITE_PROJECT_ID)
	throw Error("APPWRITE_PROJECT_ID is not set in .env (Refer .env.example)");

const VERCEL_DEV_ENDPOINT = Constants.expoConfig?.extra?.VERCEL_DEV_ENDPOINT;
if (!VERCEL_DEV_ENDPOINT)
	throw Error("VERCEL_DEV_ENDPOINT is not set in .env (Refer .env.example)");

console.log(JSON.stringify(Constants.expoConfig?.extra, null, 2));

export const client = new Client()
	.setEndpoint(APPWRITE_ENDPOINT)
	.setProject(APPWRITE_PROJECT_ID);

console.log("Client", client);

export const account = new Account(client);
