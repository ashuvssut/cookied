import { UserIdentity } from "convex/server";

export function getUserId(identity: UserIdentity) {
	return identity.tokenIdentifier.split("|")[1];
}
