"use node";
import { decryptKey } from "gconvex/crypto";

export async function embed(
	text: string,
	encApiKey: string,
): Promise<number[]> {
	const key = decryptKey(encApiKey);
	const req = { input: text, model: "text-embedding-ada-002" };
	const resp = await fetch("https://api.openai.com/v1/embeddings", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${key}`,
		},
		body: JSON.stringify(req),
	});
	if (!resp.ok) {
		const msg = await resp.text();
		throw new Error(`OpenAI API error: ${msg}`);
	}
	const json = await resp.json();
	const vector = json["data"][0]["embedding"];
	// console.log(`Computed embedding of "${text}": ${vector.length} dimensions`);
	return vector;
}
