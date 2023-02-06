import { useEffect, useRef } from "react";

/*
 * useClickOutside hook returns a ref which you can attach to a DOM element in your component. When someone clicks or touches outside of the element, the callback function will be triggered.
 */
const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  });

  return ref;
};

export default useClickOutside;
