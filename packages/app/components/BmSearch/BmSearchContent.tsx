import { View } from "dripsy";
import { useAtom } from "jotai";
import { MotiView } from "moti";
import { BlurView } from "expo-blur";
import { useWindowDimensions } from "react-native";
import { SearchMode } from "app/components/BmSearch/SearchMode";
import { SearchResults } from "app/components/BmSearch/SearchResults";
import { bmQueryAtom } from "app/components/BmSearch/BmSearch";

export const BmSearchContent = () => {
	const [query] = useAtom(bmQueryAtom);
	const isOpen = !!query;

	const { height, width } = useWindowDimensions();
	const headerHt = 54;
	const offset = 4;
	const maxHeight = height - (headerHt - offset);
	return (
		<View sx={{ width }}>
			<View variant="layout.absoluteFlex">
				<MotiView
					animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? maxHeight : 0 }}
					style={{ height: "100%", width, top: -offset }}
					transition={{ type: "timing" }}
				>
					<BlurView
						intensity={10}
						tint="dark"
						style={{ height: "100%", alignItems: "center" }}
					>
						<View sx={{ maxWidth: 500, px: "$3", width: "100%" }}>
							<View
								sx={{ mx: "$3", px: "$3", borderRadius: 15 }}
								variant="layout.secondary"
							>
								<SearchMode />
								<SearchResults />
							</View>
						</View>
					</BlurView>
				</MotiView>
			</View>
		</View>
	);
};
