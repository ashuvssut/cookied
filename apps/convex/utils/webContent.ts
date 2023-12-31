// @ts-ignore
import absolutify from "absolutify";
import { load, Element, Document } from "cheerio";
import { COOKIED_API_PROD_URL } from "gconvex/utils/constants";

// Web Content
export async function handleFetchWebpage(urlString: string) {
	try {
		if (!urlString) throw new Error("Missing URL parameter");
		const urlObj = new URL(urlString);
		const targetUrl = urlObj.origin;
		const htmlText = await fetchHtml(targetUrl);

		let document = absolutify(htmlText, targetUrl);

		// use cheerio to also handle the unhandled relative urls in srcset attributes https://github.com/sorensen/absolutify/issues/8
		document = await absolutifySrcsetAttributes(document, targetUrl);
		// console.log(document);

		return { htmlDoc: document };
	} catch (error: any) {
		throw new Error(error.message || error.toString());
	}
}

export async function generateSearchableText(url: string) {
	// prettier-ignore
	const blacklistElements = ["style", "script", "noscript", "button", "select", "option", "img", "code"]
	// prettier-ignore
	const blockElements = ["title", "p", "address", "aside", "header", "footer", "caption", "tr", "dt", "dd", "blockquote", "details", "summary", "legend", "figcaption", "h1", "h2", "h3", "h4", "h4", "h5", "h6", "li", "plaintext", "pre", "ruby"];
	const breakerElements = ["br", "hr"];
	// prettier-ignore // const inlineElements = ["a", "abbr", "acronym", "bdi", "bdo", "b", "strong", "i", "em", "s", "strike", " big", "small", "cite", "data", "dfn", "label", "mark", "menuitem", "q", "rp", " rt", "span", "sub", "sup", "th", "td", "tt", "time", "u", "var"]; // "code" may be added (currently blacklisted)

	let searchableText = "";
	const htmlText = await fetchHtml(url);
	const $ = load(htmlText);

	// Recursive function to process nodes and build searchableText
	function processNode(node: Element | Document) {
		if (node.type !== "root") {
			const tagName = node.name;
			const isBlock = blockElements.includes(tagName);
			// const isInline = inlineElements.includes(tagName);
			const isBreaker = breakerElements.includes(tagName);
			const isBlacklist = blacklistElements.includes(tagName);

			if (isBlacklist) return;
			if (isBlock || isBreaker) searchableText += "\n";
			if (isBreaker) return;
		}
		const children = node.children || [];
		for (const child of children) {
			if (child.type === "text") searchableText += `${child.data.trim()} `;
			else if (child.type === "tag") processNode(child); // Recursively process child nodes
		}
	}

	// Start processing with the root element
	const rootElement = $.root()[0];
	if (rootElement) processNode(rootElement);

	return searchableText;
}

// This can't handle scraping CSR webapps. See End of this file for the alternative solution
export async function fetchHtml(url: string) {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
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

	// For Testing
	// const htmlDocument = `<img srcset="/_next/image?url=%2Fimage1.jpg&amp;w=100 1x, /_next/image?url=%2Fimage1.jpg&amp;w=200 2x"><img srcset="/_next/image?url=%2Fimage2.jpg&amp;w=100 1x, /_next/image?url=%2Fimage2.jpg&amp;w=200 2x">`;
}

// Doesnt work in Prod. Vercel Serverless has 50MB+ file size. but puppeteer's chromium is way larger than than. Thus, this always returns 500
// export async function fetchHtml(url: string) {
// 	try {
// 		const response = await fetch(
// 			`${COOKIED_API_PROD_URL}/api/get-html?url=${encodeURIComponent(url)}`,
// 		); // convex doesnt support puppeteer for now. So use in vercel serveless instead. Vercel works with puppeteer
// 		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
// 		const json = (await response.json()) as { body: string };
// 		return json.body;
// 	} catch (error) {
// 		console.error("Error fetching HTML:", error);
// 		throw error;
// 	}
// }
