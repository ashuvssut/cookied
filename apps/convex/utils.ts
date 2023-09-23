import { UserIdentity } from "convex/server";
import { load } from "cheerio";

export function getUserId(identity: UserIdentity) {
	return identity.tokenIdentifier.split("|")[1]!;
}

// Web Content
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
