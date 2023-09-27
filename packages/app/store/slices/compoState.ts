// Atoms whose's use is not limited to a single component
import { atom } from "jotai";

export const activeEntityIdAtom = atom<string | null>(null);
export const hoverFocusEntityIdAtom = atom<string | null>(null);

export const barLoadingAtom = atom(false);

export const bmQueryAtom = atom("");
