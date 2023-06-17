import axios, { AxiosResponse } from "axios";
import { ID, Models } from "appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "../utils/appwrite";
import { cookieAtom, authStore } from "app/store/slices/auth";
import { logoutAndResetPersist } from "app/utils/storage";
import { isWeb } from "app/utils/constants";

const generalHeaders = {
	"Content-Type": "application/json",
	"X-Appwrite-Response-Format": "1.0.0",
	"X-Appwrite-Project": APPWRITE_PROJECT_ID,
};
const axiosWithConfig = () => axios.create({ headers: generalHeaders });

const axiosWithSessionConfig = () => {
	const cookie = authStore.get(cookieAtom);
	return axios.create({ headers: { ...generalHeaders, cookie } });
};

export const loginWithEmail = async (email: string, password: string) => {
	try {
		const res: AxiosResponse<Models.Session> = await axiosWithConfig().post(
			`${APPWRITE_ENDPOINT}/account/sessions/email`,
			{ email: email, password: password },
			// {withCredentials: true}
		);
		const cookieStr = res.headers["x-fallback-cookies"];
		const cookieObj = JSON.parse(cookieStr) as { [key: string]: string };
		const cookieKey = `a_session_${APPWRITE_PROJECT_ID}`;
		const reqHeaderCookieStr = `${cookieKey}=${cookieObj[cookieKey]}`;
		return { sessionData: res.data, cookie: reqHeaderCookieStr };
	} catch (e: any) {
		throw new Error(e.message || e);
	}
};

export const getUserDetails = async () => {
	try {
		const res: AxiosResponse<Models.User<Models.Preferences>> =
			await axiosWithSessionConfig().get(
				`${APPWRITE_ENDPOINT}/account`, //
				{ withCredentials: true },
			);
		return res.data;
	} catch (e: any) {
		throw new Error(e.message || e);
	}
};

export const createAccount = async (
	email: string,
	password: string,
	name: string,
) => {
	try {
		const res: AxiosResponse<Models.User<Models.Preferences>> =
			await axiosWithConfig().post(`${APPWRITE_ENDPOINT}/account`, {
				userId: ID.unique(),
				email: email,
				password: password,
				name: name,
			});
		return res.data;
	} catch (e: any) {
		throw new Error(e.message || e);
	}
};

export const logout = async (sessionId: string) => {
	try {
		await axiosWithSessionConfig().delete(
			`${APPWRITE_ENDPOINT}/account/sessions/${sessionId}`,
		);
		logoutAndResetPersist();
		return;
	} catch (e: any) {
		throw new Error(e.message || e);
	}
};

export const logoutFromAllDevices = async () => {
	try {
		await axiosWithSessionConfig().delete(
			`${APPWRITE_ENDPOINT}/account/sessions`,
		);
		logoutAndResetPersist();
		return;
	} catch (e: any) {
		throw new Error(e.message || e);
	}
};

export const createEmailVerification = async () => {
	let REDIRECT_URL = "";
	if (__DEV__) {
		// Code to run in development mode
		console.log("Running in development mode");
		REDIRECT_URL = isWeb ? "http://localhost:19000/verify" : "cookied://";
	} else {
		REDIRECT_URL = isWeb ? "" : "cookied://";
	}
	try {
		const tokenObj: AxiosResponse<Models.Token> = //
			await axiosWithSessionConfig() //
				.post(`${APPWRITE_ENDPOINT}/account/verification`, {
					url: REDIRECT_URL,
				});
		return tokenObj.data;
	} catch (e: any) {
		throw new Error(e.message || e);
	}
};

export const verifyEmail = async (userId: string, secret: string) => {
	try {
		const tokenObj: AxiosResponse<Models.Token> =
			await axiosWithSessionConfig().put(
				`${APPWRITE_ENDPOINT}/account/verification`,
				{ userId, secret },
			);
		return tokenObj.data;
	} catch (e: any) {
		throw new Error(e.message || e);
	}
};

// export const createJwtSession = async () => {
// 	try {
// 		const res: AxiosResponse<Models.Jwt> = await axiosWithConfig.post(
// 			`${APPWRITE_ENDPOINT}/account/jwt`,
// 		);
// 		if (isWeb) {
// 			localStorage.setItem("jwt", res.data.jwt);
// 		} else {
// 			await AsyncStorage.setItem("jwt", res.data.jwt);
// 		}
// 		return res.data;
// 	} catch (e) {
// 		throw new Error(e);
// 	}
// };
