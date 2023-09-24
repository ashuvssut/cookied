import { UserIdentity } from "convex/server";
import { TBmUpd } from "gconvex/schema";
// @ts-ignore
import absolutify from "absolutify";
import { load } from "cheerio";

export function getUserId(identity: UserIdentity) {
	return identity.tokenIdentifier.split("|")[1]!;
}

export async function bmWithSearchableText(bm: TBmUpd) {
	if (!bm.url) return bm;
	const { searchableText } = await handleFetchWebpage(bm.url);
	const bmObj = { ...bm, searchableText };
	return bmObj;
}

// Web Content
export async function handleFetchWebpage(urlString: string) {
	try {
		if (!urlString) throw new Error("Missing URL parameter");
		const urlObj = new URL(urlString);
		const targetUrl = urlObj.origin;
		const htmlText = await fetchHTML(targetUrl);

		let document = absolutify(htmlText, targetUrl);

		// use cheerio to also handle the unhandled relative urls in srcset attributes https://github.com/sorensen/absolutify/issues/8
		document = await absolutifySrcsetAttributes(document, targetUrl);
		// console.log(document);

		const $ = load(document);
		$("script").remove();
		$("style").remove();
		$("*")
			.contents()
			.filter((index, node) => node.nodeType === 8)
			.remove(); // Node type 8 represents comments
		const searchableText = $.text();

		return { htmlDoc: document, searchableText, statusCode: 200 };
	} catch (error: any) {
		throw new Error(error.message || error.toString());
	}
}

export async function fetchHTML(url: string) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const html = await response.text();
		return html;
	} catch (error) {
		console.error("Error fetching HTML:", error);
		throw error;
	}
}

export async function absolutifySrcsetAttributes(
	document: string,
	baseUrl: string,
) {
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
