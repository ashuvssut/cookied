import Snackbar from "react-native-snackbar";
import { commonColors as colors } from "app/theme/theme";
import { delay } from "lodash";

const Toast = async (message: string) => {
	delay(
		() =>
			Snackbar.show({
				text: message,
				duration: Snackbar.LENGTH_LONG,
				backgroundColor: "#DDE6ED",
				textColor: "#000000",
			}),
		500,
	);
};

Toast.success = async (msg: string) => {
	delay(
		() =>
			Snackbar.show({
				text: msg,
				duration: Snackbar.LENGTH_LONG,
				backgroundColor: colors.success,
				textColor: "#000000",
			}),
		500,
	);
};

Toast.error = async (msg: string) => {
	delay(
		() =>
			Snackbar.show({
				text: msg,
				duration: Snackbar.LENGTH_LONG,
				backgroundColor: colors.error,
				textColor: "#FFFFFF",
			}),
		500,
	);
};

Toast.warn = async (msg: string) => {
	delay(
		() =>
			Snackbar.show({
				text: msg,
				duration: Snackbar.LENGTH_LONG,
				backgroundColor: colors.warning,
				textColor: "#000000",
			}),
		500,
	);
};

Toast.dismiss = () => Snackbar.dismiss();
export default Toast;
