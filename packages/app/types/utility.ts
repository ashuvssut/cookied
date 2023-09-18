// https://stackoverflow.com/questions/37688318/typescript-interface-possible-to-make-one-or-the-other-properties-required
type Only<T, U> = {
	[P in keyof T]: T[P];
} & {
	[P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type PickPartial<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
	Partial<Pick<T, K>>;

export type ValueOf<T> = T[keyof T];

export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> &
	Required<Pick<T, K>>;
export type PartialExceptForKeys<T, K extends (keyof T)[]> = Partial<
	Omit<T, K[number]>
> &
	Required<Pick<T, K[number]>>;
