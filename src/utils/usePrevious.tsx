import { useState } from "react";

export default function usePrevious<T>(state: T): T | undefined {
  const [tuple, setTuple] = useState([undefined, state]);

  if (tuple[1] !== state) {
    setTuple([tuple[1], state]); // [prevCount, currentCount]
  }
  
  return tuple[0];
}