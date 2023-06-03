import React from "react";
import { useSafeArea } from "app/components/SafeArea/useSafeArea";
import { Text, View } from "dripsy";
import { Th } from "app/theme/components";
import { StatusBar } from "expo-status-bar";

type Props = { headerName: string };

const AuthHeader = (props: Props) => {
	const inset = useSafeArea();

	return (
		<View
			sx={{
				paddingTop: inset.top,
				backgroundColor: "accent",
				alignItems: "center",
				px: ["$3", null, "$5"],
				flexDirection: "row",
			}}
		>
			<StatusBar style="dark" />
			<Th.Pressable>
				<View
					sx={{
						bg: "background",
						borderRadius: [10, null, 8],
						width: [40, null, 30],
						height: [40, null, 30],
						mr: ["$3", null, "$3"],
						justifyContent: "center",
						alignItems: "center",
						borderColor: "whiteBorder",
						borderWidth: 1,
					}}
				>
					{/* <Ionicons name="chevron-back" size={24} color="white" /> */}
				</View>
			</Th.Pressable>
			<Text variant="header" sx={{ color: "onPrimary" }}>
				{props.headerName}
			</Text>
		</View>
	);
};

export default AuthHeader;
