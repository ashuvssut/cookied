import { NextResponse } from "next/server";

export async function GET() {
	const url = process.env.NEXT_PUBLIC_ANDROID_DL;
	if (!url) throw new Error("NEXT_PUBLIC_ANDROID_DL is not set");
	try {
		return NextResponse.redirect(url, { status: 302 });
	} catch (e: any) {
		console.error(e);
		return NextResponse.json({ error: e.message });
	}
}
