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

	const { addBookmark } = useBmShelfDb();
	const formik = useFormik<TBookmarkFormSchema>({
		initialValues: {
			title: "",
			url: addBmPayload.sharedBmUrl || "",
			flPath: "",
		},
		validationSchema: bookmarkFormSchema,
		validateOnMount: true,
		onSubmit: async values => {
			const doc = await addBookmark(values);
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
