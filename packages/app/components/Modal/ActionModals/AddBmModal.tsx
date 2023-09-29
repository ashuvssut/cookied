import { View } from "dripsy";
import { useFormik } from "formik";
import bookmarkFormSchema, {
	TBookmarkFormSchema,
} from "app/components/Formik/bookmarkFormSchema";
import { useAtom } from "jotai";
import { useModal } from "app/components/Modal/useModal";
import { useBmShelfDb } from "app/hooks/useBmShelfDb";
import { BookmarkForm } from "app/components/Formik/BookmarkForm";
import { activeEntityIdAtom, bmFolderAtom } from "app/store/slices/compoState";

export const AddBmModal = () => {
	const { addBmPayload, closeModal } = useModal();
	const [, setActiveEntityId] = useAtom(activeEntityIdAtom);

	const { addBm } = useAddBookmark();
	const formik = useFormik<TBookmarkFormSchema>({
		initialValues: {
			title: "",
			url: addBmPayload.sharedBmUrl || "",
			flPath: "",
		},
		validationSchema: bookmarkFormSchema,
		validateOnMount: true,
		onSubmit: async values => {
			const doc = await addBm(values);
			if (!doc) return;
			setActiveEntityId(doc._id);
			closeModal();
		},
	});
	return (
		<View sx={{ m: "$4" }}>
			<BookmarkForm formikProps={formik} />
		</View>
	);
};

function useAddBookmark() {
	const [folder] = useAtom(bmFolderAtom);
	const { addBookmark } = useBmShelfDb();

	async function addBm(values: TBookmarkFormSchema) {
		const { title, url, flPath } = values;
		if (folder) {
			const doc = await addBookmark({
				type: "bookmark",
				parentId: folder.id as any,
				path: folder.pathArr,
				level: folder.pathArr.length - 2,
				title,
				url,
			});
			return doc;
		}
	}
	return { addBm };
}
