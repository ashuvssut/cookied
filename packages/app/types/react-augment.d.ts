import React from "react";

declare module "react" {
	/** Override forwardRef to allow generic prop types
	 * [1] https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
	 * [2] https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
	 */
	function forwardRef<T, P = {}>(
		render: (props: P, ref: React.ForwardedRef<T>) => React.ReactElement | null,
	): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
