import { useSession, signIn, signOut } from "next-auth/react";
import { useState, type FC } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { useOutsideClick } from "../../utils/custom-hooks";

interface DropdownProps {
  color: "black" | "white";
}
const Dropdown: FC<DropdownProps> = ({ color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: sessionData } = useSession();

  // Allows the user to click outside the Dropdown menu to close it
  // rather than having to click the gear icon.
  const ref = useOutsideClick(() => setIsVisible(false));

  return (
    <div
      className="inline-flex items-center justify-center rounded-md"
      ref={ref}
    >
      <div className="relative">
        <BsFillGearFill
          onClick={() => setIsVisible((prev) => !prev)}
          className={`align-middle text-xl text-${color} duration-200 hover:cursor-pointer active:scale-90`}
          aria-haspopup="true"
        />
        {/* AnimatePresence to display exit animation. */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="from absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="p-2" role="none">
                {
                  // Render either a link the profile page OR a signIn button
                  // depending on the session data.
                  sessionData?.user ? (
                    <>
                      <Link
                        href={`/profile/${sessionData.user.id}`}
                        className="block w-full rounded-lg px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-700"
                        role="menuitem"
                        id="menu-item-0"
                      >
                        Profile
                      </Link>
                      {/* Add a button to sign out of account*/}
                      <button
                        className="block w-full rounded-lg px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-700"
                        onClick={() => signOut()}
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      className="block w-full rounded-lg px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-700"
                      onClick={() => signIn()}
                    >
                      Sign In
                    </button>
                  )
                }
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dropdown;
