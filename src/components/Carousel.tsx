import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import useMeasure from "react-use-measure";

import usePrevious from "../utils/usePrevious";

const Carousel: React.FC = () => {
  const [count, setCount] = useState(1);
  const [ref, { width }] = useMeasure();
  const prev = usePrevious(count);

  const direction: number = typeof prev === "number" && count > prev ? 1 : -1;

  return (
    <div className="text-white">
      <div className="flex justify-between">
        <button onClick={() => setCount(count - 1)}>
          <FiChevronLeft className="text-2xl" />
        </button>
        <button onClick={() => setCount(count + 1)}>
          <FiChevronRight className="text-2xl" />
        </button>
      </div>
      <div className="mt-8 flex justify-center">
        <div
          ref={ref}
          className="relative flex h-24 w-1/2 items-center justify-center
          overflow-hidden bg-gray-700"
        >
          <AnimatePresence custom={{ direction, width }}>
            {/* Variants are sets (objects) of pre-defined targets,
             and they can be referred by label*/}
            <motion.div
              key={count}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              custom={{ direction, width }}
              className={`absolute flex h-20 w-20 items-center justify-center ${
                colors[Math.abs(count) % 4]
              }`}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
export default Carousel;

const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500"];

// Custom variants, remember to automatically return an object in an arrow function
// is to wrap in ()
const variants = {
  enter: (custom: { direction: number; width: number }) => ({
    x: custom.direction * custom.width,
  }),
  center: { x: 0 },
  exit: (custom: { direction: number; width: number }) => ({
    x: custom.direction * -custom.width,
  }),
};
