import { GoodCookie } from "app/assets/svg";
import { Svg } from "app/components/Svg";
import { H1, View, Pressable, Text } from "dripsy";
import { FC } from "react";
import { Bar } from "react-native-progress";
import { atom, useAtom } from "jotai";
import { isWeb } from "app/utils/constants";
import { useAuth } from "app/utils/clerk";
import { Toast } from "app/components/Toast";
import { useRouter } from "solito/router";

export const barLoadingAtom = atom(false);
export const Header: FC = () => {
	const [loading] = useAtom(barLoadingAtom);
	const { isLoaded, signOut } = useAuth();
	const router = useRouter();

	return (
		<View sx={{ justifyContent: "center", alignItems: "center" }}>
			<View variant="layout.row" sx={{ gap: 5 }}>
				<Svg
					Svg={GoodCookie}
					commonSvgProps={{ height: 30, width: 30, style: { top: -2 } }}
				/>
				<H1>COOKIED</H1>
			</View>
			{isWeb && isLoaded && (
				<Pressable
					onPress={async () => {
						try {
							await signOut();
						} catch (err) {
							Toast.error("Unable to Log out.");
							console.log(err.message || err.toString());
						}
						router.replace({ pathname: "/" });
					}}
					variant="layout.center"
					sx={{ position: "absolute", top: 25, right: 15 }}
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
				height={3}
			/>
		</View>
	);
};
