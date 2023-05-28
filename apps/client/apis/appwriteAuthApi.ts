//Initial file structure placeholder
import axios, { AxiosResponse } from "axios";
import { ID, Models } from "appwrite";
import Constants from "expo-constants";
import { Platform } from "react-native";
import Config from "react-native-config";

import { APPWRITE_PROJECT_ID } from "../utils/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASEURL = "https://cloud.appwrite.io/v1";

const axiosWithConfig = axios.create({
	headers: {
		"Content-Type": "application/json",
		"X-Appwrite-Response-Format": "1.0.0",
		"X-Appwrite-Project": APPWRITE_PROJECT_ID,
	},
});

const axiosWithJwtConfig = axios.create({
	headers: {
		"Content-Type": "application/json",
		"X-Appwrite-Response-Format": "1.0.0",
		"X-Appwrite-Project": APPWRITE_PROJECT_ID,
		"X-Appwrite-JWT": "JWT goes here", // TODO: Add JWT logic here
	},
});

/**
 *
 * @param email
 * @param password
 * @returns Session
 */
export const loginWithEmail = async (
	email: string,
	password: string,
): Promise<Models.Session> => {
	try {
		const res: AxiosResponse<Models.Session> = await axiosWithConfig.post(
			`${BASEURL}/account/sessions/email`,
			{ email: email, password: password },
		);
		return res.data;
	} catch (e: any) {
		throw new Error(e);
	}
};

export const getUserDetails = async (): Promise<
	Models.User<Models.Preferences>
> => {
	try {
		const res: AxiosResponse<Models.User<Models.Preferences>> =
			await axiosWithConfig.get(`${BASEURL}/account`);
		return res.data;
	} catch (e: any) {
		throw new Error(e);
	}
};

/**
 *
 * @param email
 * @param password
 * @param name
 * @returns
 */
export const createAccount = async (
	email: string,
	password: string,
	name: string,
): Promise<Models.User<Models.Preferences>> => {
	try {
		const res: AxiosResponse<Models.User<Models.Preferences>> =
			await axiosWithConfig.post(`${BASEURL}/account`, {
				userId: ID.unique(),
				email: email,
				password: password,
				name: name,
			});
		return res.data;
	} catch (e: any) {
		throw new Error(e);
	}
};

/**
 *
 * @param sessionId
 * @returns message
 */
export const logout = async (sessionId: string): Promise<string> => {
	try {
		await axiosWithJwtConfig.delete(`${BASEURL}/account/sessions/${sessionId}`);
		return "Successfully Logged Out";
	} catch (e: any) {
		throw new Error(e);
	}
};

/**
 *
 * @returns message
 */
export const logoutFromAllDevices = async (jwt: string): Promise<string> => {
	try {
		await axiosWithJwtConfig.delete(`${BASEURL}/account/sessions`);
		return "Successfully Logged Out from All Devices";
	} catch (e: any) {
		throw new Error(e);
	}
};

/**
 *
 * @returns
 */
export const createEmailVerification = async (): Promise<Models.Token> => {
	let REDIRECT_URL = "";
	if (__DEV__) {
		// Code to run in development mode
		console.log("Running in development mode");
		REDIRECT_URL =
			Platform.OS === "web" ? "http://localhost:19000/verify" : "cookied://";
	} else {
		REDIRECT_URL = Platform.OS === "web" ? "" : "cookied://";
	}
	try {
		const tokenObj: AxiosResponse<Models.Token> = await axiosWithJwtConfig.post(
			`${BASEURL}/account/verification`,
			{
				url: REDIRECT_URL,
			},
		);
		return tokenObj.data;
	} catch (e: any) {
		throw new Error(e);
	}
};

/**
 *
* @returns message
 */
export const verifyEmail = async (
	userId: string,
	secret: string,
): Promise<Models.Token> => {
	try {
		const tokenObj: AxiosResponse<Models.Token> = await axiosWithJwtConfig.put(
			`${BASEURL}/account/verification`,
			{
				userId: userId,
				secret: secret,
			},
		);
		return tokenObj.data;
	} catch (e: any) {
		throw new Error(e);
	}
};

/**
 *
 * @returns
 */
export const createJwtSession = async (): Promise<Models.Jwt> => {
	try {
		const res: AxiosResponse<Models.Jwt> = await axiosWithConfig.post(
			`${BASEURL}/account/jwt`,
		);
		if (Platform.OS === "web") {
			localStorage.setItem("jwt", res.data.jwt);
		} else {
			await AsyncStorage.setItem("jwt", res.data.jwt);
		}
		return res.data;
	} catch (e) {
		throw new Error(e);
	}
};
