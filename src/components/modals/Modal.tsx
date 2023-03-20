import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  // Select the id "modal-root" for the portal
  const modalRoot = document.querySelector("#modal-root");

  // create div element only once using ref
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    if (!elRef.current || !modalRoot) return;

    const el = elRef.current;
    modalRoot.appendChild(el);
    return () => {
      // Remove modal element once modal stops showing.
      modalRoot.removeChild(el);
    };
  }, [elRef, modalRoot]);

  return createPortal(
    // The portal will be for modals/dialogs
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
