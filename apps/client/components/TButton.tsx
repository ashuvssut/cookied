import React from "react";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import { Box, TText } from "../theme";
import { Link } from "expo-router";

type Props = {
	title: string;
	onPress?: () => void;
	height?: number;
	href?: string;
	disabled?: boolean;
};

const TButton = ({ title, onPress, height, href, disabled }: Props) => {
	const theme = useTheme();

	if (href) {
		return (
			<Link
				href={href}
				style={{
					width: "80%",
					minHeight: 60,
					height: height ? height : 60,
				}}
				asChild
			>
				<TouchableOpacity
					style={{
						width: "80%",
						minHeight: 50,
						height: height ? height : 50,
						marginVertical: 15,
					}}
					onPress={onPress}
				>
					<Box
						justifyContent={"center"}
						alignItems={"center"}
						backgroundColor="primary"
						flex={1}
						borderRadius={2}
					>
						<TText
							variant="button"
							color={{ phone: "white", largeScreen: "accent" }}
						>
							{title}
						</TText>
					</Box>
				</TouchableOpacity>
			</Link>
		);
	}

	if (disabled) {
		return (
			<TouchableOpacity
				disabled
				style={{
					width: "80%",
					minHeight: 50,
					height: height ? height : 50,
					marginVertical: 15,
				}}
				onPress={onPress}
			>
				<Box
					justifyContent={"center"}
					alignItems={"center"}
					backgroundColor="surface"
					flex={1}
					borderRadius={2}
				>
					<TText
						variant="button"
						color={{ phone: "white", largeScreen: "accent" }}
					>
						{title}
					</TText>
				</Box>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity
			style={{
				width: "80%",
				minHeight: 50,
				height: height ? height : 50,
				marginVertical: 15,
			}}
			onPress={onPress}
		>
			<Box
				justifyContent={"center"}
				alignItems={"center"}
				backgroundColor="primary"
				flex={1}
				borderRadius={2}
			>
				<TText
					variant="button"
					color={{ phone: "white", largeScreen: "accent" }}
				>
					{title}
				</TText>
			</Box>
		</TouchableOpacity>
	);
};

export default TButton;
