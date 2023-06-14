// registerRootComponent happens in "expo-router/entry"
import "expo-router/entry";
import { LogBox } from "react-native";
import { initAsyncStorageInspector } from "asyncstorage-inspector-flipper";

initAsyncStorageInspector();
LogBox.ignoreLogs([
	"Constants.manifest has been deprecated in favor of Constants.expoConfig.",
	"new NativeEventEmitter()",
]);
