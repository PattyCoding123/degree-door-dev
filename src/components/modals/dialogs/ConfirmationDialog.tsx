import { AnimatePresence, motion } from "framer-motion";
import { AiFillWarning } from "react-icons/ai";

import Modal from "../Modal";

interface ConfirmationDialogProps {
  icon?: React.ReactNode;
  header: string;
  content: string;
  okBtnText: string;
  handleOk: () => void;
  handleCancel: () => void;
  show: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  const { okBtnText, handleOk, handleCancel, show, icon, header, content } =
    props; // Destructure props for ConfirmationDialog

  return (
    // AnimatePresence will display exit animations.
    <AnimatePresence>
      {show && (
        <Modal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
              exit={{ y: -50, opacity: 0, transition: { duration: 0.2 } }}
              className="fixed inset-0 z-10 overflow-y-auto"
            >
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        {/* Heroicon name: outline/exclamation-triangle */}
                        {icon ? (
                          <>{icon}</>
                        ) : (
                          // Default icon for confirmation dialog
                          <AiFillWarning className=" h-6 w-6 text-red-600" />
                        )}
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg font-medium leading-6 text-gray-900"
                          id="modal-title"
                        >
                          {header}
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleOk()}
                    >
                      {okBtnText}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog;
