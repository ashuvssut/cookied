import { ScrollView, useWindowDimensions } from "react-native";
import { View } from "dripsy";
import { useSafeArea } from "app/components/SafeArea/useSafeArea";
import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	setTopInset?: boolean;
};

const ScrollScreen = ({ children, setTopInset }: Props) => {
	const inset = useSafeArea();
	const { height } = useWindowDimensions();
	return (
		<ScrollView style={{ flex: 1 }}>
			<View
				sx={{
					flex: 1,
					px: "$4",
					pt: setTopInset ? inset.top : 0,
					minHeight: setTopInset ? height + inset.top : height,
					bg: "background",
				}}
			>
				{children}
			</View>
		</ScrollView>
	);
};

export default ScrollScreen;
