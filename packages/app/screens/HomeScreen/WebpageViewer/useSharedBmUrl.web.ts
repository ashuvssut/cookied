import { useModal } from "app/components/Modal";
import { isArray } from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useSharedBmUrl() {
	const router = useRouter();
	const sharedBmUrl = router.query.sharedBmUrl;
	const baseUrl = router.asPath.replace(/\?.*/, "");

	const { openModal, modalType } = useModal();
	useEffect(() => console.log(modalType), [modalType]);
	useEffect(() => {
		const url = isArray(sharedBmUrl) ? sharedBmUrl[0] : sharedBmUrl;
		if (url) {
			openModal({ type: "add-bookmark", payload: { sharedBmUrl: url } });
			router.replace(baseUrl);
		}
	}, [sharedBmUrl, modalType]);
}

// contrib:- {TYPO} searchParams -> params https://solito.dev/app-directory/hooks#usesearchparams
