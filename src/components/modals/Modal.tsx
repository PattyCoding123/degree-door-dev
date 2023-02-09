import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  // create div element only once using ref
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    const modalRoot = document.querySelector("#modal-root");

    if (!elRef.current || !modalRoot) return;

    const el = elRef.current;
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [elRef]);

  return createPortal(
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>,
    elRef.current
  );
};

export default Modal;
