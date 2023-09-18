import { View, Text } from "dripsy";
import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { Th } from "app/theme/components";
import { selectFlPathWithTitleById } from "app/store/slices/bmShelfSlice";
import { useAppSelector } from "app/store/hooks";
import addEditBmSchema from "app/validators/addEditBmSchema";
import { useAtom } from "jotai";
import { activeEntityIdAtom } from "app/store/slices/compoState";
import { barLoadingAtom } from "app/components/Header";
import { useModal } from "app/components/Modal/useModal";
import { useBmShelfDb } from "app/hooks/useBmShelfDb";
import { BmFolderPathSearch } from "app/components/Modal/ActionModals/BmFolderPathSearch";

export type TFormikInitialValues = {
	title: string;
	url: string;
	flPath: string;
};

export const AddBmModal = () => {
	const [activeEntityId] = useAtom(activeEntityIdAtom);
	const activeFlPathWithTitle = //
		useAppSelector(s => selectFlPathWithTitleById(s, activeEntityId));
	const [folder, setFolder] = useState(activeFlPathWithTitle);

	const { addBmPayload, closeModal } = useModal();
	const { addBookmark } = useBmShelfDb();
	const formik = useFormik<TFormikInitialValues>({
		initialValues: {
			title: "",
			url: addBmPayload.sharedBmUrl || "",
			flPath: "",
		},
		validationSchema: addEditBmSchema,
		validateOnMount: true,
		onSubmit: async ({ title, url, flPath }) => {
			if (folder) {
				const doc = await addBookmark({
					type: "bookmark",
					parentId: folder.id,
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
			<Th.TextInput
				value={formik.values.title}
				onChangeText={formik.handleChange("title")}
				autoCorrect={false}
				onBlur={formik.handleBlur("title")}
				placeholder="Enter the title"
				autoFocus
			/>
			<View sx={{ marginTop: "$4" }} />
			<Th.TextInput
				value={formik.values.url}
				onChangeText={formik.handleChange("url")}
				autoCorrect={false}
				onBlur={formik.handleBlur("url")}
				placeholder="Enter URL"
			/>
			<Text sx={{ color: "error", width: "50%" }}>
				{formik.errors.url ? formik.errors.url : " "}
			</Text>
			<BmFolderPathSearch
				{...{ formik, setFolder }}
				initialQuery={activeFlPathWithTitle?.path || ""}
			/>
			<ModalActions formik={formik} />
		</View>
	);
};

const ModalActions = (
	{ formik }: { formik: FormikProps<TFormikInitialValues> }, //
) => {
	const { closeModal } = useModal();
	const [isBarLoading] = useAtom(barLoadingAtom);

	return (
		<View
			sx={{
				flexDirection: "row",
				justifyContent: "space-evenly",
				gap: "$4",
			}}
		>
			<Th.ButtonSecondary onPress={closeModal} sx={{ flex: 1 }}>
				Cancel
			</Th.ButtonSecondary>
			<Th.ButtonPrimary
				onPress={() => formik.handleSubmit()}
				sx={{ flex: 1 }}
				disabled={isBarLoading}
			>
				Add
			</Th.ButtonPrimary>
		</View>
	);
};
