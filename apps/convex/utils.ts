import { UserIdentity } from "convex/server";
import { TBmUpd } from "gconvex/schema";
// @ts-ignore
import { generateSearchableText } from "gconvex/webContentUtils";

export function getUserId(identity: UserIdentity) {
	return identity.tokenIdentifier.split("|")[1]!;
}

export async function bmWithSearchTokens(bm: TBmUpd) {
	if (!bm.url) return bm;
	const searchableText = await generateSearchableText(bm.url);
	const searchTokens = tokenizeString(searchableText);
	const bmObj = { ...bm, searchTokens, searchableText };
	return bmObj;
}

export function tokenizeString(text: string) {
	const lines = text.split("\n");
	const lineTokens: string[] = [];
	for (const line of lines) {
		const trimmedLine = line.trim();
		if (trimmedLine !== "") lineTokens.push(trimmedLine);
	}
	return lineTokens;
}
