"use node";
import { v } from "convex/values";
import { action } from "gconvex/_generated/server";

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

				const title = titleMatch && titleMatch[1] ? titleMatch[1] : "Untitled";
				const description =
					descriptionMatch && descriptionMatch[1] ? descriptionMatch[1] : null;

				const suffix = !!description ? ` - ${description}` : "";
				return title + suffix;
			} catch (error) {
				console.error("Error fetching website content:", error);
				return null;
			}
		}
		return await getTitleFromUrl(url);
	},
});
