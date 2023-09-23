import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const hasUrl = searchParams.has("url");
		const url = hasUrl ? searchParams.get("url") : null;
		if (!url) return NextResponse.json({ error: "Missing URL parameter" });

		const browser = await puppeteer.launch({ headless: "new" });
		const page = await browser.newPage();

		await page.goto(url as string);
		const bodyHTML = await page.content();
		await browser.close();

		const clientOrigins = [
			"https://cookied.vercel.app",
			"http://localhost:3000",
		].join(" ");

		const nextRes = NextResponse.json({ body: bodyHTML }, { status: 200 });
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
