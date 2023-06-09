import { useRef, useEffect } from 'react';
import { Modalize } from "react-native-modalize";


export const useCombinedRefs = (...refs) => {
  const targetRef = useRef<Modalize>();

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};