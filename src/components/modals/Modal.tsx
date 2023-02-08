import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  // create div element only once using ref
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    const el = elRef.current!; // non-null assertion because it will never be null
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>,
    elRef.current
  );
};

export default Modal;
