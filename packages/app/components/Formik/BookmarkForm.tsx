import { TBookmarkFormSchema } from "app/components/Formik/bookmarkFormSchema";
import { FC, useEffect } from "react";
import { FormikProps } from "formik";
import { FormTextField } from "app/components/Formik/FormFields/BasicFields";
import { View } from "dripsy";
import { BmFolderPathSearch } from "app/components/Formik/FormFields/BmFolderPathSearch";
import { Th } from "app/theme/components";
import {
	TFlPathWithTitle,
	selectFlPathWithTitleById,
} from "app/store/slices/bmShelfSlice";
import { useAppSelector } from "app/store/hooks";
import { atom, useAtom } from "jotai";
import { activeEntityIdAtom } from "app/store/slices/compoState";
import { barLoadingAtom } from "app/components/Header";
import { useModal } from "app/components/Modal/useModal";

interface IBookmarkForm {
	formikProps: FormikProps<TBookmarkFormSchema>;
}

export const bmFolderAtom = atom<TFlPathWithTitle | undefined>(undefined);
export const BookmarkForm: FC<IBookmarkForm> = ({ formikProps: p }) => {
	const [activeEntityId] = useAtom(activeEntityIdAtom);
	const activeFlPathWithTitle = //
		useAppSelector(s => selectFlPathWithTitleById(s, activeEntityId));

	const [, setBmFolder] = useAtom(bmFolderAtom);
	useEffect(() => {
		void setBmFolder(activeFlPathWithTitle);
	}, [activeFlPathWithTitle]);

	return (
		<>
			<FormTextField
				name="title"
				formikProps={p}
				fieldProps={{ placeholder: "Enter the Bookmark name", autoFocus: true }}
			/>
			<View sx={{ marginTop: "$4" }} />
			<FormTextField
				name="url"
				formikProps={p}
				fieldProps={{ placeholder: "Enter the Bookmark URL" }}
			/>
			<BmFolderPathSearch
				formikProps={p}
				initialQuery={activeFlPathWithTitle?.path || ""}
			/>
			<ModalActions formik={p} />
		</>
	);
};

const ModalActions = (
	{ formik }: { formik: FormikProps<TBookmarkFormSchema> }, //
) => {
	const { closeModal, modalType } = useModal();
	const [isBarLoading] = useAtom(barLoadingAtom);

	return (
		<View
			sx={{ flexDirection: "row", justifyContent: "space-evenly", gap: "$4" }}
		>
			<Th.ButtonSecondary onPress={closeModal} sx={{ flex: 1 }}>
				Cancel
			</Th.ButtonSecondary>
			<Th.ButtonPrimary
				onPress={() => formik.handleSubmit()}
				sx={{ flex: 1 }}
				disabled={isBarLoading}
			>
				{modalType.includes("edit") ? "Edit" : "Add"}
			</Th.ButtonPrimary>
		</View>
	);
};
