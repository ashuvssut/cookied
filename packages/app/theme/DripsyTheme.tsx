import TypographyLoader from "app/theme/TypographyLoader";
import { darkTheme, lightTheme } from "app/theme/theme";
import { DripsyProvider } from "dripsy";
import { useColorScheme } from "react-native";

export function DripsyTheme({ children }: { children: React.ReactNode }) {
	const colorMode = useColorScheme();
	return (
		<DripsyProvider
			theme={colorMode === "dark" ? darkTheme : lightTheme}
			// this disables SSR, since react-native-web doesn't have support for it (yet)
			ssr
		>
			<TypographyLoader>
				<>{children}</>
			</TypographyLoader>
		</DripsyProvider>
	);
}
