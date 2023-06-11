import { FlatList, View, Text, Pressable } from "dripsy";
import { StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { Th } from "app/theme/components";
import { TModal } from "app/components/Modal";
import {
	IFolder,
	selectFlPathsWithTitles,
} from "app/store/slices/bmShelfSlice";
import Fuse from "fuse.js";
import { ListRenderItemInfo, Platform } from "react-native";
import logr from "app/utils/logr";
import { useAppSelector } from "app/store/hooks";
import bookmarkSchema from "app/validators/bookmarkSchema";
import { useBmShelfDB } from "app/hooks/useBmShelfDB";

type Props = {
	title: string;
	type: TModal;
	onClose: () => void;
	initialUrl?: string;
};

export type TSearchResults = Fuse.FuseResult<{
	path: string;
	id: string;
	pathArr: string[];
}>[];

const ActionModal = (props: Props) => {
	const [searchResults, setSearchResults] = useState<TSearchResults>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [folder, setFolder] = useState<
		{ path: string; id: string; pathArr: string[] } | undefined
	>();
	// const folders = useAppSelector(state => state.bmShelf.folders.entities);
	const { addBookmark } = useBmShelfDB();

	const handleSearch = (text: string) => {
		setSearchQuery(text);
		const options = {
			includeScore: true,
			keys: [["path"]],
		};
		const fuse = new Fuse(foldersSelector, options);
		const results = fuse.search(text);
		setSearchResults(results);
		console.log(
			"Results----------------------------------------->",
			JSON.stringify(results),
		);
	};

	const getFolderDetails = (folderDetail: {
		path: string;
		id: string;
		pathArr: string[];
	}) => {
		setSearchQuery(folderDetail.path);
		setSearchResults([]);
		setFolder(folderDetail);
	};

	const foldersSelector = useAppSelector(selectFlPathsWithTitles);
	// logr("Folder Selector", foldersSelector);

	function addHttpsToUrl(url:string):string {
		if (!url.startsWith('http://') && !url.startsWith('https://')) {
			url = 'https://' + url.toLowerCase();
		}
		return url;
	}

	const handleSubmitForm = async(title: string, url: string) => {
		console.log("I am running",title, addHttpsToUrl(url));
		if (props.type === "add-bookmark") {
			if (folder) {
				await addBookmark({
					type: "bookmark",
					parentId: folder.id,
					path: folder.pathArr,
					url: addHttpsToUrl(url),
					title: title,
					level: folder.pathArr.length - 1,
				});
			}
		}
		if (props.type === "edit-bookmark") {
		}
		if (props.type === "add-folder") {
		}
		if (props.type === "edit-folder") {
		}
	};

	const renderSearchResults = useMemo((): JSX.Element[] => {
		return searchResults.map((result, index) => {
			return (
				<Pressable
					onPress={() => getFolderDetails(result.item)}
					key={result.item.id}
					sx={{
						marginTop: index === 0 ? 10 : 0,
						height: 50,
						borderTopRightRadius: index === 0 ? 5 : 0,
						borderTopLeftRadius: index === 0 ? 5 : 0,
						borderBottomRightRadius: index === searchResults.length - 1 ? 5 : 0,
						borderBottomLeftRadius: index === searchResults.length - 1 ? 5 : 0,
						borderBottomWidth: StyleSheet.hairlineWidth,
						borderColor:
							index === searchResults.length - 1 ? "transparent" : "#444",
						backgroundColor: "surfaceHigh",
						justifyContent: "center",
					}}
				>
					<Text sx={{ color: "onPrimary", px: "$3" }}>{result.item.path}</Text>
				</Pressable>
			);
		});
	}, [searchResults]);

	return (
		<View sx={{ m: "$4" }}>
			<Formik
				initialValues={{
					title: "",
					url: props.initialUrl ? props.initialUrl : "",
				}}
				validationSchema={bookmarkSchema}
				validateOnMount
				onSubmit={(values: { title: string; url: string }) => {
					console.log("I am running",values.title, values.url);
					// handleSubmit(values.title, values.url);
				}}
			>
				{p => (
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
									onChangeText={handleSearch}
									autoCorrect={false}
									placeholder="Search Folders"
								/>
								{renderSearchResults}
							</View>
						)}
						<View
							sx={{
								flexDirection: "row",
								justifyContent: "space-evenly",
								paddingBottom: Platform.OS === "web" ? 80 : 0,
								backgroundColor: "black",
							}}
						>
							<Th.ButtonSecondary
								onPress={() => props.onClose()}
								sx={{ flex: 1, marginRight: "$3" }}
							>
								Cancel
							</Th.ButtonSecondary>
							<Th.ButtonPrimary
								onPress={()=>handleSubmitForm(p.values.title,p.values.url)}
								sx={{ flex: 1, marginLeft: "$3",zIndex:8,elevation:6 }}
							>
								Add
							</Th.ButtonPrimary>
						</View>
					</>
				)}
			</Formik>
		</View>
	);
};

export default ActionModal;
