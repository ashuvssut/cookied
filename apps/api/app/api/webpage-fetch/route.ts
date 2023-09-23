import { NextResponse } from "next/server";
// @ts-ignore
import absolutify from "absolutify";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const hasUrl = searchParams.has("url");
		const urlString = hasUrl ? searchParams.get("url") : null;
		if (!urlString)
			return NextResponse.json({ error: "Missing URL parameter" });
		const urlObj = new URL(urlString);
		const targetUrl = urlObj.origin;
		const htmlText = await fetchHTML(targetUrl);

		const document = absolutify(htmlText, targetUrl);

		const clientOrigins = [
			process.env.NEXT_PUBLIC_WEB_URL,
			process.env.NEXT_PUBLIC_WEB_DEV_URL,
		].join(" ");

		const nextRes = NextResponse.json({ body: document }, { status: 200 });
		nextRes.headers.set("Content-Type", "text/html");
		nextRes.headers.set(
			"Content-Security-Policy",
			`frame-ancestors 'self' ${clientOrigins}`,
		);
		return nextRes;
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Error fetching URL" }, { status: 500 });
	}
}

async function fetchHTML(url: string) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const html = await response.text();
		return html;
	} catch (error) {
		console.error("Error fetching HTML:", error);
		throw error; // Re-throw the error if needed
	}
}
