import { styled } from "dripsy";
import { Pressable, View } from "react-native";

const _Pressable = () => (
	<Pressable
		hitSlop={30}
		style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
	/>
);

export const Th = () => null;
Th.Pressable = styled(_Pressable)({});
