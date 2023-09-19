import { View } from "dripsy";
import { useFormik } from "formik";
import { TFlPathWithTitle } from "app/store/slices/bmShelfSlice";
import Fuse from "fuse.js";
import { useBmShelfDb } from "app/hooks/useBmShelfDb";
import { useModal } from "app/components/Modal/useModal";
import folderFormSchema from "app/components/Formik/folderFormSchema";
import { FolderForm } from "app/components/Formik/FolderForm";

export type TSearchResults = Fuse.FuseResult<TFlPathWithTitle>[];

export const AddFlModal = () => {
	const { addFolder } = useBmShelfDb();
	const { addFlPayload, closeModal } = useModal();
	const { parentFl } = addFlPayload;

	const p = useFormik({
		initialValues: { title: "" },
		validationSchema: folderFormSchema,
		validateOnMount: true,
		onSubmit: async ({ title }) => {
			const doc = await addFolder({
				type: "folder",
				parentId: parentFl ? parentFl._id : "root",
				path: parentFl ? [...parentFl.path, parentFl._id] : ["root"],
				level: parentFl ? parentFl.level + 1 : 0,
				title,
			});
			if (doc) closeModal();
		},
	});

	return (
		<View sx={{ m: "$4" }}>
			<FolderForm formikProps={p} />
		</View>
	);
};
