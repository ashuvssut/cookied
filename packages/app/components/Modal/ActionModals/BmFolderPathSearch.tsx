import { View, Text, Pressable, useDripsyTheme } from "dripsy";
import { StyleSheet } from "react-native";
import { FC, useEffect, useMemo, useState } from "react";
import { Th } from "app/theme/components";
import {
	TFlPathWithTitle,
	selectFlPathWithTitleArray,
} from "app/store/slices/bmShelfSlice";
import Fuse from "fuse.js";
import { useAppSelector } from "app/store/hooks";
import { MdArrowUpward } from "app/assets/icons";
import { TFormikInitialValues } from "./AddBmModal";
import { FormikProps } from "formik";

export type TSearchResults = Fuse.FuseResult<TFlPathWithTitle>[];

interface SearchFieldProps {
	formik: FormikProps<TFormikInitialValues>;
	initialQuery: string;
	setFolder: (folder: TFlPathWithTitle) => void;
}
export const BmFolderPathSearch: FC<SearchFieldProps> = (
	{ formik, initialQuery, setFolder }, //
) => {
	// Fuse config
	const flPathsWithTitles = useAppSelector(selectFlPathWithTitleArray);
	const fuse = new Fuse(
		flPathsWithTitles, //
		{ keys: ["path"], shouldSort: true, distance: 1000 },
	);

	const [searchQuery, setSearchQuery] = useState(initialQuery);
	useEffect(() => {
		formik.setFieldValue("flPath", searchQuery); // contrib:- [TS] "flPath" was not autocompleted
	}, [searchQuery]);
	const [searchResults, setSearchResults] = useState<TSearchResults>([]);
	const handleSearch = (text: string) => {
		setSearchQuery(text);
		const results = fuse.search(text);
		setSearchResults(results);
	};
	useEffect(() => void handleSearch(initialQuery), []);

	const renderSearchResults = useMemo(() => {
		return searchResults.map((result, index) => {
			if (index > 3) return null; // show only 4 results
			return (
				<SearchResult
					key={result.item.id}
					onPress={() => {
						setSearchQuery(result.item.path);
						setSearchResults([]);
						setFolder(result.item);
					}}
					path={result.item.path}
				/>
			);
		});
	}, [searchResults]);

	return (
		<View sx={{ height: 300, marginTop: "$4" }}>
			<Th.TextInput
				value={searchQuery}
				onChangeText={handleSearch}
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
	);
};

const SearchResult = ({ onPress, path }) => {
	const colors = useDripsyTheme().theme.colors;

	return (
		<Pressable
			onPress={onPress}
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
			<Text sx={{ color: "onPrimary" }}>{path}</Text>
			<MdArrowUpward size={25} color={colors.onPrimary} />
		</Pressable>
	);
};
