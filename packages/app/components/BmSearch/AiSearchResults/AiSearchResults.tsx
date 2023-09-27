import { MdContentPaste, MdRefresh, MdSearch } from "app/assets/icons";
import { getEncryptedKey } from "app/components/BmSearch/AiSearchResults/openAi";
import { useOpenAi } from "app/components/BmSearch/AiSearchResults/useOpenAi";
import { bmQueryAtom } from "app/components/BmSearch/BmSearch";
import { ResultCard } from "app/components/BmSearch/ResultCard";
import { IconButton } from "app/components/IconButton";
import { Toast } from "app/components/Toast";
import { IBookmark, selectAllBmEntities } from "app/store/slices/bmShelfSlice";
import { Th } from "app/theme/components";
import { FCC } from "app/types/IReact";
import { useAction, useQuery } from "convex/react";
import {
	ActivityIndicator,
	Text,
	TextInput,
	View,
	useDripsyTheme,
} from "dripsy";
import { api } from "gconvex/_generated/api";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";

export function AiSearchResults() {
	const { onPrimary, onInactive } = useDripsyTheme().theme.colors;

	const { encryptedKey, submitApiKey } = useOpenAi();
	const [apiKey, setApiKey] = useState("");

	if (!encryptedKey) {
		return (
			<View sx={{ bg: "surfaceHigh", px: "$4", py: "$3", borderRadius: 15 }}>
				<Text variant="label" sx={{ my: "$3" }}>
					Your OpenAI key
				</Text>
				<View variant="layout.row">
					<TextInput
						sx={{
							pl: "$4",
							pr: 50,
							width: "100%",
							bg: "surface",
							color: "onPrimary",
							height: 65,
							borderRadius: 15,
						}}
						onChangeText={txt => setApiKey(txt)}
						value={apiKey}
						placeholderTextColor={onInactive}
						placeholder="Your OpenAI key"
					/>
					<IconButton
						sx={{ position: "absolute", right: 10 }}
						onPress={async () => {
							const text = await Clipboard.getStringAsync();
							setApiKey(text);
						}}
					>
						<MdContentPaste size={22} color={onPrimary} />
					</IconButton>
				</View>
				<Text variant="overline" sx={{ mt: "$4" }}>
					Please store your API key securely.
				</Text>
				<Text variant="regular" sx={{ my: "$1" }}>
					Cookied doesn't store your OpenAI key on its server, so it can't be
					synced across devices. You have to provide API keys with each login.
				</Text>

				<Th.ButtonPrimary
					disabled={!apiKey}
					onPress={() => submitApiKey(apiKey)}
				>
					Encrypt and Save locally!
				</Th.ButtonPrimary>
			</View>
		);
	}
	return <SearchInitializer encryptedKey={encryptedKey} />;
}

function SearchInitializer({ encryptedKey }: { encryptedKey: string }) {
	const emptyEmbeddingDocs = useQuery(
		api.bmShelf.bookmark.getEmptyEmbeddingDocs,
	);

	const updateEmbeddings = useAction(api.openAi.updateEmbeddings);
	const [isUpdating, setIsUpdating] = useState(false);
	async function requestEmbedding() {
		setIsUpdating(true);
		if (emptyEmbeddingDocs?.length)
			await updateEmbeddings({ docs: emptyEmbeddingDocs, encryptedKey });
		setIsUpdating(false);
	}
	useEffect(() => void requestEmbedding(), [emptyEmbeddingDocs]);

	const searchReady = !emptyEmbeddingDocs?.length;
	return (
		<>
			{!searchReady ? (
				isUpdating ? (
					<ToastView bg="success">
						<Text>
							Please wait while AI Search is being prepared.{`\n`}We are
							updating vector embeddings for all bookmarks.
						</Text>
						<ActivityIndicator color="#fff" size="large" />
					</ToastView>
				) : (
					<ToastView bg="error">
						<Text>Failed to prepare AI search</Text>
						<IconButton onPress={() => requestEmbedding()}>
							<MdRefresh color="#fff" size={18} />
						</IconButton>
					</ToastView>
				)
			) : null}
			<SearchResultCards />
		</>
	);
}

function SearchResultCards() {
	const aiSearchSimilarBms = useAction(api.openAi.aiSearchSimilarBms);
	const [query] = useAtom(bmQueryAtom);

	const [results, setResults] = useState<IBookmark[]>([]);
	const allBmsEntities = useSelector(selectAllBmEntities) || [];

	async function fetchResults() {
		const encApiKey = await getEncryptedKey();
		if (encApiKey) {
			try {
				const res = await aiSearchSimilarBms({ query, encApiKey });
				const docs = res.flatMap(r => {
					const bmEntity = allBmsEntities[r._id];
					return bmEntity !== undefined ? [bmEntity] : [];
				});
				setResults(docs);
			} catch (err: any) {
				const msg = err.message || err.toString();
				Toast.error(`Search Error: ` + msg);
				console.log(`Search Error`, msg);
			}
		} else Toast.error("OpenAI API not found. Please submit you API key.");
	}

	return (
		<>
			<View variant="layout.row" sx={{ justifyContent: "space-between" }}>
				<Text variant="overline">Describe what was that content about.</Text>
				<IconButton
					onPress={fetchResults}
					sx={{
						flexDirection: "row",
						color: "#fff",
						alignItems: "center",
						gap: 10,
						pl: 20,
						pr: 10,
					}}
				>
					<Text>Search</Text>
					<MdSearch color="#fff" size={24} />
				</IconButton>
			</View>
			<FlatList
				data={results}
				renderItem={({ item }) => <ResultCard item={item} />}
				style={{ marginVertical: 10 }}
			/>
		</>
	);
}

const ToastView: FCC<{ bg: "success" | "error" }> = ({ children, bg }) => {
	return (
		<View
			variant="layout.row"
			sx={{ p: "$4", borderRadius: 15, bg, justifyContent: "space-between" }}
			style={{ marginBottom: 10 }}
		>
			{children}
		</View>
	);
};
