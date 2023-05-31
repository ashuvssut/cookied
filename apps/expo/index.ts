// registerRootComponent happens in "expo-router/entry"
import 'expo-router/entry'
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
	"Constants.manifest has been deprecated in favor of Constants.expoConfig.",
]);
