import { View, Text, Pressable, useDripsyTheme } from "dripsy";
import { StyleSheet } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, FormikProps } from "formik";
import { Th } from "app/theme/components";
import {
	TFlPathWithTitle,
	selectFlId,
	selectFlPathWithTitleArray,
	selectFlPathWithTitleById,
} from "app/store/slices/bmShelfSlice";
import Fuse from "fuse.js";
import logr from "app/utils/logr";
import { useAppSelector } from "app/store/hooks";
import addEditBmSchema from "app/validators/addEditBmSchema";
import { useBmShelfDB } from "app/hooks/useBmShelfDB";
import { useAtom } from "jotai";
import { MdArrowUpward } from "app/assets/icons";
import { activeEntityIdAtom } from "app/store/slices/compoState";
import { barLoadingAtom } from "app/components/Header";

export type TSearchResults = Fuse.FuseResult<TFlPathWithTitle>[];

export const AddBmModal = () => {
	const colors = useDripsyTheme().theme.colors;
	const [searchResults, setSearchResults] = useState<TSearchResults>([]);
	const [activeEntityId] = useAtom(activeEntityIdAtom);
	const activeFlPathWithTitle = useAppSelector(s =>
		selectFlPathWithTitleById(s, activeEntityId),
	);
	const [searchQuery, setSearchQuery] = useState(
		activeFlPathWithTitle?.path || "",
	);
	const [folder, setFolder] = useState(activeFlPathWithTitle);
	const { addBookmark } = useBmShelfDB();
	const flPathsWithTitles = useAppSelector(selectFlPathWithTitleArray);

	const handleSearch = (text: string) => {
		setSearchQuery(text);
		const fuse = new Fuse(
			flPathsWithTitles, //
			{ keys: ["path"], shouldSort: true, distance: 1000 },
		);
		const results = fuse.search(text);
		setSearchResults(results);
	};
	useEffect(() => void handleSearch(searchQuery), []);
	const handleSubmitForm = async (fields: { title: string; url: string }) => {
		if (folder) {
			const doc = await addBookmark({
				type: "bookmark",
				parentId: folder.id,
				path: folder.pathArr,
				level: folder.pathArr.length - 2,
				...fields,
			});
			if (doc) props.onClose();
		}
	};

	type TFormikInitialValues = { title: string; url: string; flPath: string };
	const formikProps = useRef<FormikProps<TFormikInitialValues> | null>(null);
	// useEffect(
	// 	() => formikProps.current?.handleChange("flPath")(searchQuery), // hacky way to run handleChange on flPath field on first render
	// 	[],
	// );
	const renderSearchResults = useMemo(() => {
		return searchResults.map((result, index) => {
			if (index > 3) return null; // show only 4 results
			return (
				<Pressable
					onPress={() => {
						setSearchQuery(result.item.path);
						setSearchResults([]);
						setFolder(result.item);
					}}
					key={result.item.id}
					sx={{
						minHeight: 50,
						borderBottomWidth: StyleSheet.hairlineWidth,
						justifyContent: "space-between",
						alignItems: "center",
						flexDirection: "row",
						px: "$4",
					}}
					style={({ hovered }) => ({
						backgroundColor: hovered ? colors.secondary : colors.surfaceHigh,
					})}
				>
					<Text sx={{ color: "onPrimary" }}>{result.item.path}</Text>
					<MdArrowUpward size={25} color={colors.onPrimary} />
				</Pressable>
			);
		});
	}, [searchResults]);

	const [isBarLoading] = useAtom(barLoadingAtom);
	return (
		<View sx={{ m: "$4" }}>
			<Text>Test: Add Bm form</Text>
			{/* <Formik
				initialValues={{ title: "", url: props.initialUrl || "", flPath: "" }}
				validationSchema={addEditBmSchema}
				validateOnMount
				onSubmit={({ title, url }) => handleSubmitForm({ title, url })}
			>
				{p => {
					formikProps.current = p;
					Object.keys(p.errors).length > 0 && logr(p.errors);
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
							<View sx={{ marginTop: "$4" }} />
							<Th.TextInput
								value={p.values.url}
								onChangeText={p.handleChange("url")}
								autoCorrect={false}
								onBlur={p.handleBlur("url")}
								placeholder="Enter URL"
							/>
							<Text sx={{ color: "error", width: "50%" }}>
								{p.errors.url ? p.errors.url : " "}
							</Text>
							<View sx={{ height: 300, marginTop: "$4" }}>
								<Th.TextInput
									value={searchQuery}
									onChangeText={text => {
										handleSearch(text);
										p.handleChange("flPath")(searchQuery);
									}}
									autoCorrect={false}
									placeholder="Search Folders"
									sx={{ zIndex: 1, color: "onPrimary" }}
								/>
								<View
									variant="layout.noTopRadius"
									sx={{ borderRadius: 8, overflow: "hidden", top: -2 }}
								>
									{renderSearchResults}
								</View>
							</View>
							<View
								sx={{
									flexDirection: "row",
									justifyContent: "space-evenly",
									gap: "$4",
								}}
							>
								<Th.ButtonSecondary
									onPress={() => props.onClose()}
									sx={{ flex: 1 }}
								>
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
			</Formik> */}
		</View>
	);
};
