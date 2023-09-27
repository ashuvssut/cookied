import { useAppDispatch } from "app/store/hooks";
import { useAuth } from "app/utils/clerk";
import { storeEncryptedKey } from "app/components/BmSearch/AiSearchResults/openAi";

export function useSignOut() {
	const { signOut: clerkSignOut } = useAuth();
	const dispatch = useAppDispatch();
	async function signOut() {
		await storeEncryptedKey("");
		dispatch({ type: "USER_LOGOUT" });
		await clerkSignOut();
	}
	return { signOut };
}
