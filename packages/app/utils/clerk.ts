import { SignedIn as SIExpo, SignedOut as SOExpo } from "@clerk/clerk-expo";
import { SignedIn as SINext, SignedOut as SONExt } from "@clerk/nextjs";
import { isWeb } from "app/utils/constants";

export const SignedIn = isWeb ? SINext : SIExpo;
export const SignedOut = isWeb ? SONExt : SOExpo;
