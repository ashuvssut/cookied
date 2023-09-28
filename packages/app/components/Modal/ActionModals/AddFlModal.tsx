import { View } from "dripsy";
import { useFormik } from "formik";
import { useBmShelfDb } from "app/hooks/useBmShelfDb";
import { useModal } from "app/components/Modal/useModal";
import folderFormSchema from "app/components/Formik/folderFormSchema";
import { FolderForm } from "app/components/Formik/FolderForm";
import { useAtom } from "jotai";
import { activeEntityIdAtom } from "app/store/slices/compoState";

export const AddFlModal = () => {
	const { addFolder } = useBmShelfDb();
	const { addFlPayload, closeModal } = useModal();
	const { parentFl } = addFlPayload;

	const [, setActiveEntityId] = useAtom(activeEntityIdAtom);
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
			if (doc) {
				setActiveEntityId(doc._id);
				closeModal();
			}
		},
	});

	return (
		<View sx={{ m: "$4" }}>
			<FolderForm formikProps={p} />
		</View>
	);
};
