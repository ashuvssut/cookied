import { GoodCookie } from "app/assets/svg";
import { Svg } from "app/components/Svg";
import { H1, View, Pressable, Text } from "dripsy";
import { FC } from "react";
import { Bar } from "react-native-progress";
import { atom, useAtom } from "jotai";
import { usePlatformAuth } from "app/hooks/useAuth/usePlatformAuth";
import { isWeb } from "app/utils/constants";

export const barLoadingAtom = atom(false);
export const Header: FC = () => {
	const [loading] = useAtom(barLoadingAtom);
	const { signOut, user } = usePlatformAuth();

	return (
		<View sx={{ justifyContent: "center", alignItems: "center" }}>
			<View variant="layout.row" sx={{ gap: 5 }}>
				<Svg
					Svg={GoodCookie}
					commonSvgProps={{ height: 30, width: 30, style: { top: -2 } }}
				/>
				<H1>COOKIED</H1>
			</View>
			{isWeb && !!user && (
				<Pressable
					hitSlop={7}
					onPress={() => signOut()}
					sx={{
						position: "absolute",
						top: 25,
						right: 15,
						elevation: 5,
						borderRadius: 5,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text>LOGOUT</Text>
				</Pressable>
			)}
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
