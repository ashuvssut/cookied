import * as yup from "yup";

export async function sleep(delay: number) {
	return new Promise(resolve => setTimeout(resolve, delay));
}

export async function delayed(delay: number, fn: Function) {
	await sleep(delay);
	return fn();
}

export const isUrlValid = async (url: string) =>
	await yup.string().url().isValid(url);
