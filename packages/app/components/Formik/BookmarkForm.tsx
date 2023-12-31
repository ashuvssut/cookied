import { TBookmarkFormSchema } from "app/components/Formik/bookmarkFormSchema";
import { FC, useEffect } from "react";
import { FormikProps } from "formik";
import { FormTextField } from "app/components/Formik/FormFields/BasicFields";
import { View } from "dripsy";
import { BmFolderPathSearch } from "app/components/Formik/FormFields/BmFolderPathSearch";
import { Th } from "app/theme/components";
import {
	selectFlPathWithTitleByBmId,
	selectFlPathWithTitleByFlId,
} from "app/store/slices/bmShelfSlice";
import { useAppSelector } from "app/store/hooks";
import { useAtom } from "jotai";
import {
	activeEntityIdAtom,
	barLoadingAtom,
	bmFolderAtom,
} from "app/store/slices/compoState";
import { useModal } from "app/components/Modal/useModal";
import { BmTitleFetchingField } from "app/components/Formik/FormFields/BmTitleFetchingField";

interface IBookmarkForm {
	formikProps: FormikProps<TBookmarkFormSchema>;
}

export const BookmarkForm: FC<IBookmarkForm> = ({ formikProps: p }) => {
	const [activeEntityId] = useAtom(activeEntityIdAtom);
	const activeFlPathWithTitle = //
		useAppSelector(s => selectFlPathWithTitleByFlId(s, activeEntityId));
	const activeParentFlPathWithTitleOfBm = //
		useAppSelector(s => selectFlPathWithTitleByBmId(s, activeEntityId));

	const isBmEntity =
		!activeFlPathWithTitle && !!activeParentFlPathWithTitleOfBm;
	const activeEntity = isBmEntity
		? activeParentFlPathWithTitleOfBm
		: activeFlPathWithTitle;

	const [, setBmFolder] = useAtom(bmFolderAtom);
	useEffect(() => void setBmFolder(activeEntity), [activeEntity]);

	return (
		<>
			<FormTextField
				name="url"
				formikProps={p}
				fieldProps={{
					placeholder: "Enter the Bookmark URL",
					autoFocus: true,
					keyboardType: "url",
				}}
			/>
			<View sx={{ marginTop: "$2" }} />
			<BmTitleFetchingField formikProps={p} />
			<BmFolderPathSearch
				formikProps={p}
				initialQuery={activeEntity?.path || ""}
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
