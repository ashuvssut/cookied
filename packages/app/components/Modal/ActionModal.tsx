import { View, Text, Pressable, useDripsyTheme } from "dripsy";
import { StyleSheet } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import { Th } from "app/theme/components";
import { TModal } from ".";
import {
	TFlPathWithTitle,
	selectFlById,
	selectFlPathsWithTitles,
} from "app/store/slices/bmShelfSlice";
import Fuse from "fuse.js";
import { Platform } from "react-native";
import logr from "app/utils/logr";
import { useAppSelector } from "app/store/hooks";
import addEditBmSchema from "app/validators/addEditBmSchema";
import { useBmShelfDB } from "app/hooks/useBmShelfDB";
import { useAtom } from "jotai";
import { MdArrowUpward } from "app/assets/icons";
import { activeEntityIdAtom } from "app/store/slices/compoState";

type Props = {
	title: string;
	type: TModal;
	onClose: () => void;
	initialUrl?: string;
};

export type TSearchResults = Fuse.FuseResult<TFlPathWithTitle>[];

export const ActionModal = (props: Props) => {
	const colors = useDripsyTheme().theme.colors;
	const [searchResults, setSearchResults] = useState<TSearchResults>([]);
	const [activeEntityId] = useAtom(activeEntityIdAtom);
	const activeFl = useAppSelector(s => selectFlById(s, activeEntityId || ""));
	const [searchQuery, setSearchQuery] = useState(activeFl?.title || "");
	const [folder, setFolder] = useState<TFlPathWithTitle | undefined>();
	const { addBookmark } = useBmShelfDB();
	const flPathsWithTitles = useAppSelector(selectFlPathsWithTitles);

	const handleSearch = (text: string) => {
		setSearchQuery(text);
		const fuse = new Fuse(flPathsWithTitles, {
			keys: ["path"],
			shouldSort: true,
			distance: 1000,
		});
		const results = fuse.search(text);
		setSearchResults(results);
	};
	useEffect(() => void handleSearch(searchQuery), []);

	const handleSubmitForm = async (fields: { title: string; url: string }) => {
		if (props.type === "add-bookmark") {
			if (folder) {
				try {
					const doc = await addBookmark({
						type: "bookmark",
						parentId: folder.id,
						path: folder.pathArr,
						level: folder.pathArr.length - 2,
						...fields,
					});
					if (doc) props.onClose();
					// TODO success & failure snackbar
				} catch (err) {
					logr.err(err);
				}
			}
		}
		if (props.type === "edit-bookmark") {
		}
		if (props.type === "add-folder") {
		}
		if (props.type === "edit-folder") {
		}
	};

	const renderSearchResults = useMemo(() => {
		return searchResults.map((result, index) => {
			if (index > 4) return null; // show only 5 results
			return (
				<Pressable
					onPress={() => {
						setSearchQuery(result.item.path);
						setSearchResults([]);
						setFolder(result.item);
					}}
					key={result.item.id}
					sx={{
						height: 50,
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
	return (
		<View sx={{ m: "$4" }}>
			<Formik
				initialValues={{ title: "", url: props.initialUrl || "", flPath: "" }}
				validationSchema={addEditBmSchema}
				validateOnMount
				onSubmit={({ title, url }) => handleSubmitForm({ title, url })}
			>
				{p => {
					logr(p.errors);
					return (
						<>
							<Th.TextInput
								value={p.values.title}
								onChangeText={p.handleChange("title")}
								autoCorrect={false}
								onBlur={p.handleBlur("title")}
								placeholder="Enter the title"
							/>
							<View sx={{ marginTop: "$4" }} />
							{(props.type === "add-bookmark" ||
								props.type === "edit-bookmark") && (
								<Th.TextInput
									value={p.values.url}
									onChangeText={p.handleChange("url")}
									autoCorrect={false}
									onBlur={p.handleBlur("url")}
									placeholder="Enter URL"
								/>
							)}
							{(props.type === "add-bookmark" ||
								props.type === "edit-bookmark") && (
								<View sx={{ height: 300, marginTop: "$4" }}>
									<Th.TextInput
										value={searchQuery}
										onChangeText={(text: string) => {
											p.handleChange("flPath")(text);
											handleSearch(text);
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
							)}
							<View
								sx={{
									flexDirection: "row",
									justifyContent: "space-evenly",
									pb: Platform.OS === "web" ? 80 : 0,
								}}
							>
								<Th.ButtonSecondary
									onPress={() => props.onClose()}
									sx={{ flex: 1, marginRight: "$3" }}
								>
									Cancel
								</Th.ButtonSecondary>
								<Th.ButtonPrimary
									onPress={() => p.handleSubmit()}
									sx={{ flex: 1, marginLeft: "$3", zIndex: 8, elevation: 6 }}
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
