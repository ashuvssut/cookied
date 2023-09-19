import { FormTextField } from "app/components/Formik/FormFields/BasicFields";
import { FC } from "react";
import { FormikProps } from "formik";
import { TFolderFormSchema } from "app/components/Formik/folderFormSchema";
import { View } from "dripsy";
import { Th } from "app/theme/components";
import { useAtom } from "jotai";
import { barLoadingAtom } from "app/components/Header";
import { useModal } from "app/components/Modal/useModal";

interface IFolderForm {
	formikProps: FormikProps<TFolderFormSchema>;
}

export const FolderForm: FC<IFolderForm> = ({ formikProps: p }) => {
	const [isBarLoading] = useAtom(barLoadingAtom);
	const { closeModal, modalType } = useModal();

	return (
		<>
			<FormTextField
				formikProps={p}
				fieldProps={{ placeholder: "Enter the Folder name", autoFocus: true }}
				name="title"
			/>
			<View
				variant="layout.row"
				sx={{ justifyContent: "space-evenly", gap: "$4" }}
			>
				<Th.ButtonSecondary onPress={closeModal} sx={{ flex: 1 }}>
					Cancel
				</Th.ButtonSecondary>
				<Th.ButtonPrimary
					onPress={() => p.handleSubmit()}
					sx={{ flex: 1 }}
					disabled={isBarLoading}
				>
					{modalType.includes("edit") ? "Edit" : "Add"}
				</Th.ButtonPrimary>
			</View>
		</>
	);
};
