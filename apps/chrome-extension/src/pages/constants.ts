export const isDevMode = import.meta.env.MODE === "development";
export const isProdMode = import.meta.env.MODE === "production";

export const webAppDevUrl = "http://localhost:3000";
export const webAppProdUrl = "https://cookied.vercel.app";

export const webAppUrl = isDevMode ? webAppDevUrl : webAppProdUrl;
