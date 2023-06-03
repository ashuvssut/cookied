import { Platform } from "react-native";
import { SvgProps } from "react-native-svg";

type Props = {
	Svg: any;
	nativeSvgProps?: SvgProps;
	webSvgProps?: React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>;
};
export const Svg = ({ Svg, nativeSvgProps, webSvgProps }: Props) => {
	if (Platform.OS === "web") return <img src={Svg.src} {...webSvgProps} />;

	return <Svg {...nativeSvgProps} />;
};
