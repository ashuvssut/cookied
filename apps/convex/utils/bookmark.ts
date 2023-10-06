import { TBmUpd } from "gconvex/schema";
import { generateSearchableText } from "gconvex/utils/webContent";

export async function bmWithSearchFields(bm: TBmUpd) {
	if (!bm.url) return bm;
	const searchableText = await generateSearchableText(bm.url);
	const searchTokens = tokenizeString(searchableText);
	const bmObj = { ...bm, searchTokens, searchableText, embedding: [] };
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
