import { useEffect, useRef } from "react";

/*
 * useClickOutside hook returns a ref which you can attach to a Div element in your component.
 * When someone clicks or touches outside of the element, the callback function will be triggered.
 */
const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  /* 
    We check !ref.current.contains(event.target as Node) because we only want
    the callback to trigger when the click happens outside the component.

    event.target is casted as Node to limit down target types to DOM elements.
  */
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
