import { NextResponse } from "next/server";

export async function GET() {
	try {
		return NextResponse.json({
			"Web app": process.env.NEXT_PUBLIC_WEB_URL,
			"Android QR Code": process.env.NEXT_PUBLIC_ANDROID_QR,
			"Android Download Link": process.env.NEXT_PUBLIC_ANDROID_DL,
			"Chrome Extension": process.env.NEXT_PUBLIC_CHROME_EXT,
		});
	} catch (e: any) {
		console.error(e);
		return NextResponse.json({ error: e.message });
	}
}
