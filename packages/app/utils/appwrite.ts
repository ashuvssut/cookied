import { Account, Client } from "appwrite";
import Constants from "expo-constants";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";
export const APPWRITE_ENDPOINT = isWeb
	? process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
	: Constants.expoConfig?.extra?.APPWRITE_ENDPOINT;
if (!APPWRITE_ENDPOINT)
	throw Error("APPWRITE_ENDPOINT isn't set in env.js/.env.local");

export const APPWRITE_PROJECT_ID = isWeb
	? process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
	: Constants.expoConfig?.extra?.APPWRITE_PROJECT_ID;
if (!APPWRITE_PROJECT_ID)
	throw Error("APPWRITE_PROJECT_ID isn't set in env.js/.env.local");

export const APPWRITE_BOOKMARK_COLLECTION_ID = isWeb
	? process.env.NEXT_PUBLIC_APPWRITE_BOOKMARK_COLLECTION_ID
	: Constants.expoConfig?.extra?.APPWRITE_BOOKMARK_COLLECTION_ID;
if (!APPWRITE_BOOKMARK_COLLECTION_ID)
	throw Error("APPWRITE_BOOKMARK_COLLECTION_ID isn't set in env.js/.env.local");
	
export const APPWRITE_FOLDER_COLLECTION_ID = isWeb
	? process.env.NEXT_PUBLIC_APPWRITE_FOLDER_COLLECTION_ID
	: Constants.expoConfig?.extra?.APPWRITE_FOLDER_COLLECTION_ID;
if (!APPWRITE_FOLDER_COLLECTION_ID)
	throw Error("APPWRITE_FOLDER_COLLECTION_ID isn't set in env.js/.env.local");	

export const APPWRITE_DATABASE_ID = isWeb
	? process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
	: Constants.expoConfig?.extra?.APPWRITE_DATABASE_ID;
if (!APPWRITE_DATABASE_ID)
	throw Error("APPWRITE_DATABASE_ID isn't set in env.js/.env.local");	

// const VERCEL_DEV_ENDPOINT = isWeb
// 	? process.env.VERCEL_DEV_ENDPOINT
// 	: Constants.expoConfig?.extra?.VERCEL_DEV_ENDPOINT;

// console.log(JSON.stringify(Constants.expoConfig?.extra, null, 2));
// console.log(process.env);

export const client = new Client()
	.setEndpoint(APPWRITE_ENDPOINT)
	.setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
