import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
	if (process.env.NODE_ENV !== "development")
		return NextResponse.json({
			error: "This endpoint is only available in development mode.",
		});

	// Modify the received cookie or create a new one
	const modifiedCookie = `abc-value=xyz-value; Path=/; Domain=localhost; Max-Age=3600; `;

	// Set the cookie in the response headers

	// Send a response
	const nextRes = NextResponse.json({ message: "Cookie sent successfully" });
	nextRes.headers.set("Set-Cookie", modifiedCookie);
	return nextRes;
}
