import { Account, Client } from "appwrite";
import Config from "react-native-config";
import Constants from "expo-constants";
import { Platform } from "react-native";

const ENDPOINT =
	Platform.OS === "web" && Constants.expoConfig && Constants.expoConfig.extra
		? Constants.expoConfig.extra.APPWRITE_ENDPOINT
			? Constants.expoConfig.extra.APPWRITE_ENDPOINT
			: ""
		: (Config.APPWRITE_ENDPOINT as string);
const PROJECT_ID =
	Platform.OS === "web" && Constants.expoConfig && Constants.expoConfig.extra
		? Constants.expoConfig.extra.APPWRITE_PROJECT_ID
			? Constants.expoConfig.extra.APPWRITE_PROJECT_ID
			: ""
		: (Config.APPWRITE_PROJECT_ID as string);

console.log("ENDPOINT", ENDPOINT, "Project ID", PROJECT_ID);

export const client = new Client()
	.setEndpoint(ENDPOINT) // Your API Endpoint
	.setProject(PROJECT_ID); // Your project ID

console.log("Client", client);

export const account = new Account(client);
