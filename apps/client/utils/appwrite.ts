import { Account, Client } from "appwrite";
import Config from "react-native-config";
console.log(
	"ENDPOINT",
	Config.APPWRITE_ENDPOINT,
	"Project ID",
	Config.APPWRITE_PROJECT_ID,
);
export const client = new Client()
	.setEndpoint(Config.APPWRITE_ENDPOINT as string) // Your API Endpoint
	.setProject(Config.APPWRITE_PROJECT_ID as string); // Your project ID

export const account = new Account(client);
