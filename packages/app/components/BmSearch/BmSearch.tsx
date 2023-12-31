import { MotiView } from "moti";
import { View, TextInput, useDripsyTheme } from "dripsy";
import { MdSearch } from "app/assets/icons";
import { isWeb } from "app/utils/constants";
import { useAtom } from "jotai";
import { bmQueryAtom } from "app/store/slices/compoState";
import { useUser } from "app/utils/clerk";

export const BmSearch = () => {
	const [query] = useAtom(bmQueryAtom);

	const { user } = useUser();
	if (!user) return null;
	return (
		<MotiView animate={{ scale: !!query ? 1.1 : 1 }}>
			<SearchField />
		</MotiView>
	);
};

function SearchField() {
	const [query, setQuery] = useAtom(bmQueryAtom);

	const onPrimary = useDripsyTheme().theme.colors.onPrimary;
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
						color: "onPrimary",
					}}
					onChangeText={txt => setQuery(txt)}
					value={query}
					placeholderTextColor={onPrimary}
					placeholder="Search by site's content..."
				/>
				<View sx={{ position: "absolute", right: p, bg: "surface" }}>
					<MdSearch color={onPrimary} size={20} />
				</View>
			</View>
		</View>
	);
}
