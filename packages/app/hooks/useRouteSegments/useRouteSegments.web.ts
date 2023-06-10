
import { useRouter } from "next/router";

export function useRouteSegments() {
	return useRouter().asPath.split("/");
}
