import { useOpenAi } from "app/components/BmSearch/AiSearchResults/useOpenAi";
import { Th } from "app/theme/components";
import { Text, TextInput, View, useDripsyTheme } from "dripsy";
import { useState } from "react";

export function AiSearchResults() {
	const inactive = useDripsyTheme().theme.colors.onInactive;

	const { encryptedKey, submitApiKey } = useOpenAi();
	const [apiKey, setApiKey] = useState("");

	if (!encryptedKey) {
		return (
			<View sx={{ bg: "surfaceHigh", px: "$4", py: "$3", borderRadius: 15 }}>
				<Text variant="label" sx={{ my: "$3" }}>
					Your OpenAi key
				</Text>
				<TextInput
					sx={{
						px: "$4",
						width: "100%",
						bg: "surface",
						color: "onPrimary",
						height: 65,
						borderRadius: 15,
					}}
					onChangeText={txt => setApiKey(txt)}
					value={apiKey}
					placeholderTextColor={inactive}
					placeholder="Your OpenAi key"
				/>
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
	return (
		<>
			<Text variant="overline">Describe what was that content about.</Text>
		</>
	);
}
