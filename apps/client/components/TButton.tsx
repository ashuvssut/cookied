import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { Box, TText } from "../theme";

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
			<Link href={href} style={styles.button} asChild>
				<TouchableOpacity
					style={{
						width: "100%",
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
						width={{ phone: "100%", largeScreen: "40%" }}
						borderRadius={8}
						overflow={"hidden"}
					>
						<LinearGradient
							// Button Linear Gradient
							colors={["hsla(288, 84%, 47%, 1)", "hsla(317, 100%, 50%, 0.58)"]}
							start={{ x: 0, y: 0.5 }}
							end={{ x: 1, y: 0.7 }}
							style={styles.linearGradient}
						>
							<TText variant="button" color={"white"}>
								{title}
							</TText>
						</LinearGradient>
					</Box>
				</TouchableOpacity>
			</Link>
		);
	}

	if (disabled) {
		return (
			<TouchableOpacity disabled style={styles.button} onPress={onPress}>
				<Box
					justifyContent={"center"}
					alignItems={"center"}
					backgroundColor="background"
					width={{ phone: "100%", largeScreen: "40%" }}
					flex={1}
					borderRadius={8}
					overflow={"hidden"}
				>
					<LinearGradient
						// Button Linear Gradient
						colors={["#28313B", "#485461"]}
						start={{ x: 0, y: 0.5 }}
						end={{ x: 1, y: 0.7 }}
						style={styles.linearGradient}
					>
						<TText variant="button" color={"white"}>
							{title}
						</TText>
					</LinearGradient>
				</Box>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Box
				justifyContent={"center"}
				alignItems={"center"}
				backgroundColor="primary"
				flex={1}
				width={{ phone: "100%", largeScreen: "40%" }}
				borderRadius={8}
				overflow={"hidden"}
			>
				<LinearGradient
					// Button Linear Gradient
					colors={["hsla(288, 84%, 47%, 1)", "hsla(317, 100%, 50%, 0.58)"]}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.7 }}
					style={styles.linearGradient}
				>
					<TText variant="button" color={"white"}>
						{title}
					</TText>
				</LinearGradient>
			</Box>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	button: {
		minHeight: 50,
		height: 50,
		marginVertical: 15,
		elevation: 20,
		shadowColor: "hsla(219, 76%, 31%, 63)",
	},
});

export default TButton;
