import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const hasUrl = searchParams.has("url");
		const url = hasUrl ? searchParams.get("url") : null;
		if (!url || !isValidUrl(url)) {
			return NextResponse.json(
				{ error: "Invalid or missing URL parameter" },
				{ status: 400 },
			);
		}

		const browser = await puppeteer.launch({ headless: "new" });
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: "networkidle2" });
		const bodyHTML = await page.content();
		await browser.close();

		return NextResponse.json({ body: bodyHTML }, { status: 200 });
	} catch (error: any) {
		const msg =
			"Error in scraping HTML text: " + error.message || error.toString();
		console.error(msg);
		return NextResponse.json({ error: msg }, { status: 500 });
	}
}

function isValidUrl(url: string) {
	try {
		new URL(url);
		return true;
	} catch (error) {
		return false;
	}
}
