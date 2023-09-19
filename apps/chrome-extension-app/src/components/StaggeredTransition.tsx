import { TransitionProps } from "@mui/material/transitions";
import { Children, FC, ReactElement, ReactNode } from "react";

interface IStaggeredTransition {
	children: ReactNode;
	staggerTime: number;
	Transition: FC<TransitionProps & { children: ReactElement<any, any> }>;
	transitionProps?: TransitionProps;
}
export const StaggeredTransition: FC<IStaggeredTransition> = ({
	children,
	staggerTime,
	Transition,
	transitionProps,
}) => {
	const staggeredChildren = Children.map(children, (child, i) => (
		<Transition
			key={i}
			style={{ transitionDelay: `${i * staggerTime}ms` }}
			{...transitionProps}
		>
			{/* @ts-ignore */}
			{child}
		</Transition>
	));
	return <>{staggeredChildren}</>;
};
