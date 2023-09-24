"use node";
import { v } from "convex/values";
import { action } from "gconvex/_generated/server";
import { handleFetchWebpage } from "gconvex/utils";

export const getTitleFromUrl = action({
	args: { url: v.string() },
	handler: async (ctx, { url }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		async function getTitleFromUrl(url: string) {
			try {
				const response = await fetch(url);
				const htmlContent = await response.text();
				const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
				const descriptionMatch = htmlContent //
					.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);

				const urlObj = new URL(url);
				const altUrl = urlObj.hostname + urlObj.pathname;

				const title = titleMatch && titleMatch[1] ? titleMatch[1] : altUrl;
				const description =
					descriptionMatch && descriptionMatch[1] ? descriptionMatch[1] : null;

				const suffix = !!description ? ` - ${description}` : "";
				return title + suffix;
			} catch (error) {
				console.error("Error fetching website meta:", error);
				return null;
			}
		}
		return await getTitleFromUrl(url);
	},
});

export const fetchWebpage = action({
	args: { url: v.string() },
	handler: async (ctx, { url }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthenticated. Please Sign in.");

		try {
			const res = await handleFetchWebpage(url);
			return res;
		} catch (error: any) {
			throw new Error(error.message || error.toString());
		}
	},
});
