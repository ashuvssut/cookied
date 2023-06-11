import { View as MotiView, useDynamicAnimation } from "moti";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import {
	useSharedValue,
	interpolate,
	Extrapolate,
} from "react-native-reanimated";
import { Platform, useWindowDimensions } from "react-native";
import {
	ForwardedRef,
	forwardRef,
	useCallback,
	useImperativeHandle,
} from "react";

const isWeb = Platform.OS === "web";

interface ISlideInView {
	children: React.ReactNode;
}
export interface ISlideInViewRefProps {
	triggerToggle: () => void;
}

export const SlideInView = forwardRef(
	(props: ISlideInView, ref: ForwardedRef<ISlideInViewRefProps>) => {
		const { width } = useWindowDimensions();

		const scaleInAnim = useDynamicAnimation(() => {
			return { scale: 1, translateX: 0, borderRadius: 0 };
		});

		const translateX = useSharedValue(0);
		const triggerToggle = useCallback(() => {
			if (Number(scaleInAnim.current?.translateX) > -width / 4) {
				scaleInAnim.animateTo(
					{ scale: 0.8, translateX: -width / 2, borderRadius: 20 }, //
				);
			} else if (Number(scaleInAnim.current?.translateX) < -width / 4) {
				scaleInAnim.animateTo({ scale: 1, translateX: 0, borderRadius: 0 });
			}
		}, [width]);
		useImperativeHandle(ref, () => ({ triggerToggle }), [triggerToggle]);

		const ctx = useSharedValue({ x: 0 });
		const pan = Gesture.Pan()
			.onStart(() => (ctx.value = { x: translateX.value }))
			.onUpdate(({ translationX }) => {
				if (isWeb) return;
				translateX.value = translationX + ctx.value.x;
				// limit translation between -width / 2 and 0
				translateX.value = Math.min(0, Math.max(-width / 2, translateX.value));

				const scale = interpolate(
					translateX.value,
					[-width / 2, 0],
					[0.8, 1],
					Extrapolate.CLAMP,
				);
				const borderRadius = interpolate(
					translateX.value,
					[-width / 2, 0],
					[20, 0],
					Extrapolate.CLAMP,
				);
				scaleInAnim.animateTo(
					{ scale, translateX: translateX.value, borderRadius }, //
				);
			})
			.onEnd(() => {
				if (isWeb) return;
				const translationX = translateX.value;
				if (translationX > -width / 4) {
					scaleInAnim.animateTo({
						scale: 1,
						translateX: 0,
						borderRadius: 0,
					});
				} else if (translationX < -width / 4) {
					scaleInAnim.animateTo(
						{ scale: 0.8, translateX: -width / 2, borderRadius: 20 }, //
					);
				}
			});

		return (
			<GestureDetector gesture={pan}>
				<MotiView
					transition={{ type: "timing", duration: 250 }}
					style={{ overflow: "hidden" }}
					state={scaleInAnim}
				>
					<>{props.children}</>
				</MotiView>
			</GestureDetector>
		);
	},
);
