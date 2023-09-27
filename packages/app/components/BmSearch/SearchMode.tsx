import { Text, View, useDripsyTheme } from "dripsy";
import { MotiPressable } from "moti/interactions";
import { useAtom } from "jotai";
import { searchModeAtom } from "app/store/slices/compoState";

export function SearchMode() {
	const { primary, secondary, onPrimary } = useDripsyTheme().theme.colors;
	const [mode, setMode] = useAtom(searchModeAtom);
	const animate = (active: boolean, btnMode: number) => {
		"worklet";
		return {
			paddingVertical: 10,
			paddingHorizontal: 20,
			color: onPrimary,
			backgroundColor: mode == btnMode ? primary : secondary,
			opacity: active ? 0.5 : 1,
			height: "100%",
		};
	};

	return (
		<View sx={{ justifyContent: "center" }}>
			<View
				variant="layout.secondary"
				sx={{
					borderRadius: 15,
					flexDirection: "row",
					p: 0,
					overflow: "hidden",
					alignItems: "center",
					maxHeight: 65,
				}}
			>
				<View sx={{ width: "50%" }}>
					<MotiPressable
						animate={({ hovered, pressed }) => {
							"worklet";
							return animate(hovered || pressed, 1);
						}}
						onPress={() => setMode(1)}
					>
						<View sx={{ height: "100%", justifyContent: "center" }}>
							<Text sx={{ textAlign: "center" }}>Fuzzy Search</Text>
						</View>
					</MotiPressable>
				</View>
				<View sx={{ width: "50%" }}>
					<MotiPressable
						animate={({ hovered, pressed }) => {
							"worklet";
							return animate(hovered || pressed, 2);
						}}
						onPress={() => setMode(2)}
					>
						<View sx={{ height: "100%", justifyContent: "center" }}>
							<Text sx={{ textAlign: "center" }}>AI Vector Search</Text>
						</View>
					</MotiPressable>
				</View>
			</View>
		</View>
	);
}
