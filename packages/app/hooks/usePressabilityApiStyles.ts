import { useDripsyTheme } from "dripsy";

export function usePressabilityApiStyles() {
	const { primary, secondary } = useDripsyTheme().theme.colors;
	return ({ pressed, hovered }: { pressed: boolean; hovered: boolean }) => {
		let backgroundColor = hovered ? "#333" : primary;
		backgroundColor = pressed ? secondary : backgroundColor;
		return {
			backgroundColor,
			borderColor: pressed || hovered ? "#444" : "#0000",
		};
	};
}
