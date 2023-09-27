import { bmQueryAtom } from "app/store/slices/compoState";
import { searchModeAtom } from "app/components/BmSearch/SearchMode";
import { IBookmark, selectAllBm } from "app/store/slices/bmShelfSlice";
import { Text, View } from "dripsy";
import { useAtom } from "jotai";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ResultCard } from "app/components/BmSearch/ResultCard";
import { AiSearchResults } from "app/components/BmSearch/AiSearchResults";

export const SearchResults = () => {
	const [query] = useAtom(bmQueryAtom);
	const [mode] = useAtom(searchModeAtom);

	return (
		<View sx={{ mt: "$4" }}>
			<View sx={{ p: "$4" }}>
				{!!query && mode === 1 ? <FuzzySearchResults /> : <AiSearchResults />}
			</View>
		</View>
	);
};

function FuzzySearchResults() {
	const allBms = useSelector(selectAllBm) || [];

	const fuseConfig = {
		includeScore: true,
		keys: ["searchTokens"],
		threshold: 0.4,
	};

	function performFuzzySearch(query: string) {
		const fuse = new Fuse(allBms, fuseConfig);
		const matchedResults = fuse.search(query);
		matchedResults.sort((a, b) => Number(a.score) - Number(b.score)); // Sort the results by score (lower score is better)
		const results = matchedResults.map(res => res.item);
		return results;
	}

	const [query] = useAtom(bmQueryAtom);
	const [results, setResults] = useState<IBookmark[]>([]);
	useEffect(() => {
		if (!query) return;
		const results = performFuzzySearch(query);
		setResults(results);
	}, [query]);

	return (
		<>
			<Text variant="overline">
				Try to put the exact words that you remember.
			</Text>
			<FlatList // contrib:- Flatlist of dripsy has item of unknown type
				data={results}
				renderItem={({ item }) => <ResultCard item={item} />}
				style={{ marginVertical: 10 }}
			/>
		</>
	);
}
