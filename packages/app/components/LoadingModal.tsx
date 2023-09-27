import { loadingAtom } from "app/store/slices/compoState";
import { useAtom } from "jotai";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";

const LoadingModal = () => {
	const [isLoading] = useAtom(loadingAtom);
	return (
		<Modal
			transparent
			animationType="none"
			visible={isLoading}
			onRequestClose={() => null}
		>
			<View style={styles.modalBackground}>
				<View style={styles.activityIndicatorWrapper}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	activityIndicatorWrapper: {
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		padding: 20,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default LoadingModal;
