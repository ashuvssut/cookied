import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "@src/utils/constants";
import { Client } from "appwrite";

export const client = new Client()
	.setEndpoint(APPWRITE_ENDPOINT)
	.setProject(APPWRITE_PROJECT_ID);
