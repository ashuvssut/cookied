import { View, Text } from "dripsy";
import { Image } from "react-native";
import React from "react";
import { useUser } from "app/utils/clerk";
import { MdAccountCircle } from "app/assets/icons";

const l = 60;
export function Avatar() {
	const { user } = useUser();

	const imageUrl = user?.hasImage ? user.imageUrl : null;
	const name = user?.firstName ?? null;

	const avatarContent = getContent(imageUrl, name);

	return (
		<View
			variant="layout.secondary"
			sx={{
				width: l,
				height: l,
				borderRadius: l,
				overflow: "hidden",
				justifyContent: "center",
				alignItems: "center",
				bg: "#434343",
				cursor: "pointer",
			}}
		>
			{avatarContent}
		</View>
	);
}

function getContent(imageUrl: string | null, name: string | null) {
	if (imageUrl) {
		return (
			<Image
				source={{ uri: imageUrl }}
				style={{ width: l, height: l, borderRadius: l }}
			/>
		);
	} else if (name) {
		const initials = name
			.split(" ")
			.map(word => word.charAt(0))
			.join("")
			.toUpperCase();
		return (
			<Text style={{ fontSize: 24, lineHeight: 45, color: "white" }}>
				{initials}
			</Text>
		);
	} else return <MdAccountCircle size={50} color="white" />;
}
