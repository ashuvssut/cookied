import { MotiView } from "moti";
import { View, TextInput, useDripsyTheme } from "dripsy";
import { MdSearch } from "app/assets/icons";
import { isWeb } from "app/utils/constants";
import { atom, useAtom } from "jotai";

export const BmSearch = () => {
	const [query] = useAtom(bmQueryAtom);

	return (
		<MotiView animate={{ scale: !!query ? 1.1 : 1 }}>
			<SearchField />
		</MotiView>
	);
};

export const bmQueryAtom = atom("");
function SearchField() {
	const [query, setQuery] = useAtom(bmQueryAtom);

	const secondary = useDripsyTheme().theme.colors.onPrimary;
	const p = 20;
	return (
		<View variant="layout.secondary" sx={{ my: 8, borderRadius: p }}>
			<View variant="layout.row">
				<TextInput
					sx={{
						height: 38,
						pl: p,
						pr: p * 2,
						width: isWeb ? "100%" : 220,
						bg: "surface",
						color: "onPrimary",
					}}
					onChangeText={txt => setQuery(txt)}
					value={query}
					placeholderTextColor={secondary}
					placeholder="Search..."
				/>
				<View sx={{ position: "absolute", right: p, bg: "surface" }}>
					<MdSearch color={secondary} size={20} />
				</View>
			</View>
		</View>
	);
}
