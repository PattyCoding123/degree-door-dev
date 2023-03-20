import { useState } from "react";

export default function usePrevious<T>(state: T): T | undefined {
  const [tuple, setTuple] = useState([undefined, state]);

  if (tuple[1] !== state) {
    setTuple((tuple) => [tuple[1], state]); // [prevState, currentState]
  }

  return tuple[0];
}
