import { NextResponse } from "next/server";
// @ts-ignore
import absolutify from "absolutify";
import { load } from "cheerio";

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

		let document = absolutify(htmlText, targetUrl);

		// use DOMParser to also handle the unhandled relative urls in srcset attributes https://github.com/sorensen/absolutify/issues/8
		document = await absolutifySrcsetAttributes(document, targetUrl);
		console.log(document);
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

async function absolutifySrcsetAttributes(document: string, baseUrl: string) {
	const $ = load(document);

	// Find all elements with srcset attributes
	$("[srcset]").each((index, element) => {
		const srcset = $(element).attr("srcset");
		if (!srcset) return;

		const relativeSrcset = srcset.split(",");
		const absoluteSrcset = relativeSrcset
			.map(source => {
				const [url, size] = source.trim().split(/\s+/);
				if (url) {
					const decodedUrl = decodeURIComponent(url);
					try {
						const urlObj = new URL(decodedUrl);
						const hasHostname = !!urlObj.hostname;
						if (hasHostname) return source;
					} catch (err) {
						console.log(`assuming decodedUrl is a relative URL`, decodedUrl);
					}

					const absoluteUrl = new URL(decodedUrl, baseUrl).toString();
					// return `${encodeURIComponent(absoluteUrl)} ${size}`; // DIDNT WORK: frontend loaded as <frontend_url>/<this_returned_absolute_url>
					return `${absoluteUrl} ${size}`;
				}
				return source;
			})
			.join(",");

		$(element).attr("srcset", absoluteSrcset);
	});

	return $.html();
}

// For Testing
// const htmlDocument = `
//     <img srcset="/_next/image?url=%2Fimage1.jpg&amp;w=100 1x, /_next/image?url=%2Fimage1.jpg&amp;w=200 2x">
//     <img srcset="/_next/image?url=%2Fimage2.jpg&amp;w=100 1x, /_next/image?url=%2Fimage2.jpg&amp;w=200 2x">
// `;
