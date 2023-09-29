import { mutation } from "gconvex/_generated/server";

type ExtractHandlerCtx<TMutationHandler> = TMutationHandler extends {
	handler: (ctx: infer Ctx, ...args: any[]) => any;
}
	? Ctx
	: never;

type TMutationHandler = Parameters<typeof mutation>[0];
export type TCtx = ExtractHandlerCtx<TMutationHandler>;
