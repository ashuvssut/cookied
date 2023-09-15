import {atom} from "jotai"
import { RefObject } from "react";
import { Modalize } from "react-native-modalize";

// Separated out to fix Require cycle error
export const modalizeRefAtom = atom<RefObject<Modalize> | null>(null);
