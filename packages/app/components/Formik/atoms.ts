import { TFlPathWithTitle } from "app/store/slices/bmShelfSlice";
import { atom } from "jotai";

export const bmFolderAtom = atom<TFlPathWithTitle | undefined>(undefined);
