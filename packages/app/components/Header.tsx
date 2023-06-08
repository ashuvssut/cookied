import { GoodCookie } from "app/assets/svg";
import { Svg } from "app/components/Svg";
import { H1, View } from "dripsy";
import { FC } from "react";

interface IHeader {}

export const Header: FC<IHeader> = ({}) => {
	return (
		<View sx={{ flexDirection: "row", justifyContent: "center" }}>
			<View variant="layout.row" sx={{ gap: 5 }}>
				<Svg
					Svg={GoodCookie}
					commonSvgProps={{ height: 30, width: 30, style: { top: -2 } }}
				/>
				<H1>COOKIED</H1>
			</View>
		</View>
	);
};
