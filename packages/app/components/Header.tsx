import { GoodCookie } from "app/assets/svg";
import { Svg } from "app/components/Svg";
import { H1, View, Text } from "dripsy";
import { FC, useState } from "react";
import { Bar } from "react-native-progress";
import { useAtom } from "jotai";
import { isWeb } from "app/utils/constants";
import { useAuth, useUser } from "app/utils/clerk";
import { Toast } from "app/components/Toast";
import { useRouter } from "solito/router";
import { Avatar } from "app/components/Avatar";
import { Th } from "app/theme/components";
import { BmSearch } from "app/components/BmSearch";
import { BmSearchContent } from "app/components/BmSearch/BmSearchContent";
import { useSignOut } from "app/hooks/useSignOut";
import { barLoadingAtom } from "app/store/slices/compoState";

export const Header: FC = () => {
	const [loading] = useAtom(barLoadingAtom);
	const { isLoaded } = useAuth();

	return (
		<View sx={{ justifyContent: "center", alignItems: "center", zIndex: 1 }}>
			<View
				variant="layout.row"
				sx={{
					justifyContent: "space-between",
					width: isWeb ? "100%" : undefined,
					px: "$4",
				}}
			>
				{isWeb ? <Wordmark /> : <BmSearch />}
				{isWeb && <BmSearch />}
				{isWeb && isLoaded && <ProfileMenuDisplay />}
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
				height={3}
			/>
			<BmSearchContent />
		</View>
	);
};

const ProfileMenuDisplay = () => {
	const { user } = useUser();
	if (!user) return null;

	const [showMenu, setShowMenu] = useState(false);
	return (
		<View>
			<View
				sx={{ flexDirection: "row", gap: 10, py: 10, cursor: "pointer" }}
				onClick={() => setShowMenu(prev => !prev)}
			>
				<Avatar />
				<View sx={{ justifyContent: "center" }}>
					<Text variant="semibold" sx={{ fontSize: 22, lineHeight: 30 }}>
						Hi
					</Text>
					<Text variant="semibold">{user?.firstName}</Text>
				</View>
			</View>
			<View sx={{ position: "absolute", bottom: 0, right: 0, width: "100%" }}>
				<ProfileMenu showMenu={showMenu} />
			</View>
		</View>
	);
};

const ProfileMenu = ({ showMenu }: { showMenu: boolean }) => {
	const { signOut } = useSignOut();
	const router = useRouter();

	if (!showMenu) return null;
	return (
		<View sx={{ position: "absolute", top: 0, width: "100%", height: 80 }}>
			<View
				sx={{ bg: "surfaceHigh", height: "100%", borderRadius: 20, px: 10 }}
			>
				<Th.ButtonSecondary
					onPress={async () => {
						try {
							await signOut();
						} catch (err: any) {
							Toast.error("Unable to Log out.");
							console.log(err.message || err.toString());
						}
						router.replace({ pathname: "/" });
					}}
					variant="layout.center"
					sx={{}}
				>
					<Text>LOGOUT</Text>
				</Th.ButtonSecondary>
			</View>
		</View>
	);
};

function Wordmark() {
	return (
		<View variant="layout.row" sx={{ gap: 5 }}>
			<Svg
				Svg={GoodCookie}
				commonSvgProps={{ height: 30, width: 30, style: { top: -2 } }}
			/>
			<H1>COOKIED</H1>
		</View>
	);
}
