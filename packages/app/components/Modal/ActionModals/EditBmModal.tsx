import { View } from "dripsy";
import { useFormik } from "formik";
import { selectBmId } from "app/store/slices/bmShelfSlice";
import { useBmShelfDb } from "app/hooks/useBmShelfDb";
import { useModal } from "app/components/Modal/useModal";
import { useAtom } from "jotai";
import { activeEntityIdAtom, bmFolderAtom } from "app/store/slices/compoState";
import { useAppSelector } from "app/store/hooks";
import bookmarkFormSchema, {
	TBookmarkFormSchema,
} from "app/components/Formik/bookmarkFormSchema";
import { BookmarkForm } from "app/components/Formik/BookmarkForm";

export const EditBmModal = () => {
	const { closeModal } = useModal();
	const { updateBookmark } = useBmShelfDb();

	const [folder] = useAtom(bmFolderAtom);

	const [activeBmId] = useAtom(activeEntityIdAtom);
	const activeBm = useAppSelector(s => selectBmId(s, activeBmId || ""));
	const formik = useFormik<TBookmarkFormSchema>({
		initialValues: {
			title: activeBm?.title || "",
			url: activeBm?.url || "",
			flPath: "",
		},
		validationSchema: bookmarkFormSchema,
		validateOnMount: true,
		onSubmit: async ({ title, flPath, url }) => {
			if (!activeBmId) throw new Error("Active Bookmark ID is not set");
			if (!activeBm) throw new Error("Active Bm entity not found in store");
			if (folder) {
				const doc = await updateBookmark({
					...activeBm,
					parentId: folder.id as any,
					path: folder.pathArr,
					level: folder.pathArr.length - 2,
					title,
					url,
					_id: activeBmId as any,
				});
				if (doc) closeModal();
			}
		},
	});
	return (
		<View sx={{ m: "$4" }}>
			<BookmarkForm formikProps={formik} />
		</View>
	);
};
