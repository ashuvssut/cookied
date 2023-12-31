import { View } from "dripsy";
import { useFormik } from "formik";
import { selectFlId } from "app/store/slices/bmShelfSlice";
import { useBmShelfDb } from "app/hooks/useBmShelfDb";
import { useModal } from "app/components/Modal/useModal";
import folderFormSchema from "app/components/Formik/folderFormSchema";
import { FolderForm } from "app/components/Formik/FolderForm";
import { useAtom } from "jotai";
import { activeEntityIdAtom } from "app/store/slices/compoState";
import { useAppSelector } from "app/store/hooks";

export const EditFlModal = () => {
	const { updateFolder } = useBmShelfDb();
	const { closeModal } = useModal();

	const [activeFlId] = useAtom(activeEntityIdAtom);
	const activeFl = useAppSelector(s => selectFlId(s, activeFlId || ""));
	const p = useFormik({
		initialValues: { title: activeFl?.title || "" },
		validationSchema: folderFormSchema,
		validateOnMount: true,
		onSubmit: async values => {
			if (!activeFlId) throw new Error("Active Folder ID is not set");
			if (!activeFl) throw new Error("Active Fl entity not found in store");
			const doc = await updateFolder({
				...activeFl,
				...values,
				_id: activeFlId as any,
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
