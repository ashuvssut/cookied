import { Text, View } from "dripsy";
import React from "react";
import { Formik } from "formik";
import { Th } from "app/theme/components";
import { TFlPathWithTitle } from "app/store/slices/bmShelfSlice";
import Fuse from "fuse.js";
import { useBmShelfDB } from "app/hooks/useBmShelfDB";
import { useAtom } from "jotai";
import addFlSchema from "app/validators/addFlSchema";
import { barLoadingAtom } from "app/components/Header";
import { useModal } from "app/components/Modal/useModal";

export type TSearchResults = Fuse.FuseResult<TFlPathWithTitle>[];

export const AddFlModal = () => {
	const { addFolder } = useBmShelfDB();
	const { addFlPayload, closeModal } = useModal();
	const { parentFl } = addFlPayload;

	const handleSubmitForm = async (title: string) => {
		const doc = await addFolder({
			type: "folder",
			parentId: parentFl ? parentFl.$id : "root",
			path: parentFl ? [...parentFl.path, parentFl.$id] : ["root"],
			level: parentFl ? parentFl.level + 1 : 0,
			title,
		});
		if (doc) closeModal();
	};

	const [isBarLoading] = useAtom(barLoadingAtom);
	return (
		<View sx={{ m: "$4" }}>
			<Formik
				initialValues={{ title: "" }}
				validationSchema={addFlSchema}
				validateOnMount
				onSubmit={value => handleSubmitForm(value.title)}
			>
				{p => {
					return (
						<>
							<Th.TextInput
								value={p.values.title}
								onChangeText={p.handleChange("title")}
								autoCorrect={false}
								onBlur={p.handleBlur("title")}
								placeholder="Enter the title"
								autoFocus
							/>
							<Text sx={{ color: "error", width: "50%" }}>
								{!!p.errors.title && p.touched.title ? p.errors.title : " "}
							</Text>
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
									Add
								</Th.ButtonPrimary>
							</View>
						</>
					);
				}}
			</Formik>
		</View>
	);
};
