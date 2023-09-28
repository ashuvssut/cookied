import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { fileName: string } },
) {
	const firebaseStorageUrl = `https://firebasestorage.googleapis.com/v0/b/uploadstash.appspot.com/o/${params.fileName}?alt=media`;
	try {
		return NextResponse.redirect(firebaseStorageUrl, { status: 302 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching URL" + error },
			{ status: 500 },
		);
	}
}
