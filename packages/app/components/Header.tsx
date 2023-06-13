import { GoodCookie } from "app/assets/svg";
import { Svg } from "app/components/Svg";
import { H1, View } from "dripsy";
import { FC } from "react";
import { Bar } from "react-native-progress";
import { atom, useAtom } from "jotai";

export const barLoadingAtom = atom(false);
export const Header: FC = () => {
	const [loading] = useAtom(barLoadingAtom);
	return (
		<View sx={{ justifyContent: "center", alignItems: "center" }}>
			<View variant="layout.row" sx={{ gap: 5 }}>
				<Svg
					Svg={GoodCookie}
					commonSvgProps={{ height: 30, width: 30, style: { top: -2 } }}
				/>
				<H1>COOKIED</H1>
			</View>
			<Bar
				indeterminate={true}
				width={null}
				style={{
					width: "100%",
					borderColor: "#0000",
					borderRadius: 0,
					opacity: loading ? 1 : 0,
				}}
				height={1}
			/>
		</View>
	);
};
