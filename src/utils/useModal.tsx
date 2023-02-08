import { useState, useCallback } from "react";

interface ModalProps {
  header: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  singleAction: boolean;
}

export const useModal = ({ header, content, onClose, icon }: ModalProps) => {
  const [isShowing, setIsShowing] = useState(false);

  const showModal = useCallback(() => {
    setIsShowing(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsShowing(false);
    onClose && onClose();
  }, [onClose]);

  return {
    isShowing,
    showModal,
    hideModal,
    modal: (
      <>
        <div>
          <div>Modal</div>
        </div>
      </>
    ),
  };
};
