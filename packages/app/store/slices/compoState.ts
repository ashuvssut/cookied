// Atoms whose's use is not limited to a single component
import { atom } from "jotai";
import { TFlPathWithTitle } from "app/store/slices/bmShelfSlice";
import { RefObject } from "react";
import { Modalize } from "react-native-modalize";

export const activeEntityIdAtom = atom<string | null>(null);
export const hoverFocusEntityIdAtom = atom<string | null>(null);

export const loadingAtom = atom(false);
export const barLoadingAtom = atom(false);

export const bmQueryAtom = atom("");

export const searchModeAtom = atom(1);

export const bmFolderAtom = atom<TFlPathWithTitle | undefined>(undefined);

export const modalizeRefAtom = atom<RefObject<Modalize> | null>(null);
