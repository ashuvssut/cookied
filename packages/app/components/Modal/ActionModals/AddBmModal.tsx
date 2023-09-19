import { View } from "dripsy";
import { useFormik } from "formik";
import bookmarkFormSchema, {
	TBookmarkFormSchema,
} from "app/components/Formik/bookmarkFormSchema";
import { useAtom } from "jotai";
import { useModal } from "app/components/Modal/useModal";
import { useBmShelfDb } from "app/hooks/useBmShelfDb";
import { BookmarkForm } from "app/components/Formik/BookmarkForm";
import { bmFolderAtom } from "app/components/Formik/atoms";

export const AddBmModal = () => {
	const { addBmPayload, closeModal } = useModal();
	const { addBookmark } = useBmShelfDb();
	const [folder] = useAtom(bmFolderAtom);
	const formik = useFormik<TBookmarkFormSchema>({
		initialValues: {
			title: "",
			url: addBmPayload.sharedBmUrl || "",
			flPath: "",
		},
		validationSchema: bookmarkFormSchema,
		validateOnMount: true,
		onSubmit: async ({ title, url, flPath }) => {
			if (folder) {
				const doc = await addBookmark({
					type: "bookmark",
					parentId: folder.id as any,
					path: folder.pathArr,
					level: folder.pathArr.length - 2,
					title,
					url,
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
