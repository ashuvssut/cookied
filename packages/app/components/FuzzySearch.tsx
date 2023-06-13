import React, { useState } from "react";
import { TextInput, FlatList, View } from "react-native";
import Fuse from "fuse.js";

const FuzzySearch = ({ data }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<string[]>([]);

	const fuse = new Fuse(data, {
		// keys: data.id,
		includeScore: true,
		threshold: 0.4, // Adjust this value to fine-tune the search results
	});

	const handleSearch = text => {
		setSearchTerm(text);
		const results = fuse.search(text);
		console.log("Results", results);
		// setSearchResults(results.map(result => result.item));
	};

	return (
		<View>
			<TextInput
				style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }}
				onChangeText={handleSearch}
				value={searchTerm}
				placeholder="Search..."
			/>
			{/* <FlatList
				data={searchResults}
				renderItem={({ item }) => <Text>{item}</Text>}
				keyExtractor={item => item.id.toString()}
			/> */}
		</View>
	);
};

export default FuzzySearch;
