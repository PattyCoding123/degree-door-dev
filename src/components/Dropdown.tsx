import { useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { motion } from "framer-motion";
const Dropdown: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="inline-flex items-center justify-center rounded-md">
      <div className="relative">
        <BsFillGearFill
          onClick={() => setIsVisible(!isVisible)}
          className="align-middle text-lg text-white duration-200 hover:scale-90 hover:cursor-pointer"
        />
        {isVisible && (
          <div className="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg transition-opacity">
            <div className="p-2">
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700"
              >
                ReactJS Dropdown 1
              </a>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700"
              >
                ReactJS Dropdown 2
              </a>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700"
              >
                ReactJS Dropdown 3
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
