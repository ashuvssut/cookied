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
import { activeEntityIdAtom } from "app/store/slices/compoState";
import { barLoadingAtom } from "app/components/Header";
import { useModal } from "app/components/Modal/useModal";
import * as yup from "yup";
import { debounce } from "lodash";
import { useAction } from "convex/react";
import { api } from "gconvex/_generated/api";
import { bmFolderAtom } from "app/components/Formik/atoms";

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

	const getTitleFromUrl = useAction(api.webContent.getTitleFromUrl);
	useEffect(() => {
		async function setTitle() {
			const isUrlValid = await yup.string().url().isValid(p.values.url);
			if (!isUrlValid) return;
			try {
				const fetchedTitle = await getTitleFromUrl({ url: p.values.url });
				console.log(fetchedTitle);
				p.setFieldValue("title", fetchedTitle);
			} catch (err) {
				console.error("Error:", err);
			}
		}

		const debouncedSetTitle = debounce(setTitle, 1000);
		debouncedSetTitle();
		return () => void debouncedSetTitle.cancel();
	}, [p.values.url]);
	return (
		<>
			<FormTextField
				name="url"
				formikProps={p}
				fieldProps={{ placeholder: "Enter the Bookmark URL", autoFocus: true }}
			/>
			<View sx={{ marginTop: "$2" }} />
			<FormTextField
				name="title"
				formikProps={p}
				fieldProps={{ placeholder: "Enter the Bookmark name" }}
			/>
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
