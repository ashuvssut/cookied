import { FC } from "react";
import { ActivityIndicator, H1, View } from "dripsy";
import { WebView } from "app/components/WebView";
import { useAtom } from "jotai";
import { activeUrlAtom } from "app/screens/HomeScreen/TreePanel";
import { Svg } from "app/components/Svg";
import { OpenBookmark } from "app/assets/svg";
import { useAppSelector } from "app/store/hooks";
import { selectFlPathsWithTitles } from "app/store/slices/bmShelfSlice";
import logr from "app/utils/logr";

export const WebpageViewer: FC = () => {
	const [activeUrl] = useAtom(activeUrlAtom);
	const foldersSelector = useAppSelector(selectFlPathsWithTitles);
	logr("Folder Selector", foldersSelector);
	return (
		<View variants={["layout.center", "layout.secondary"]} sx={{ flex: 1 }}>
			<ActivityIndicator size="large" />
			{activeUrl ? (
				<WebView style={{ flex: 1 }} src={activeUrl} />
			) : (
				<View
					variants={
						["layout.center", "layout.absoluteFlex", "layout.secondary"] //
					}
					sx={{ overflow: "hidden" }}
				>
					<Svg
						Svg={OpenBookmark}
						commonSvgProps={{ style: { width: "70%" } }}
					/>
					<H1 sx={{ textAlign: "center", pt: "$4" }}>
						Your Bookmarks will{"\n"}open here
					</H1>
				</View>
			)}
		</View>
	);
};
