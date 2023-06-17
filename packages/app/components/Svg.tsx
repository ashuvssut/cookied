import { isWeb } from "app/utils/constants";
import { SvgProps } from "react-native-svg";

type Props = {
	Svg: any;
	nativeSvgProps?: SvgProps;
	webSvgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
	commonSvgProps?: SvgProps & React.ImgHTMLAttributes<HTMLImageElement>;
};
export const Svg = ({
	Svg,
	nativeSvgProps,
	webSvgProps,
	commonSvgProps,
}: Props) => {
	if (isWeb)
		return <img src={Svg.src} {...webSvgProps} {...commonSvgProps} />;

	return <Svg {...nativeSvgProps} {...commonSvgProps} />;
};
