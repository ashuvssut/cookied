import { Platform } from "react-native";

export const isWeb = Platform.OS === "web";
export const isAndroid = Platform.OS === "android";
export const isIos = Platform.OS === "ios";
export const OPENAI_KEY = "OPENAI_KEY";
