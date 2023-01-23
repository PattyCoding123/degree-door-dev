import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

const Carousel: React.FC = () => {
  const [count, setCount] = useState(1);
  const [tuple, setTuple] = useState([0, count]);

  if (tuple[1] !== count) {
    setTuple([tuple[1], count] as number[]); // [prevCount, currentCount]
  }
  
  const prev = tuple[0] as number;
  const direction: number = count > prev ? 1 : -1;
  
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
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden
        bg-gray-700 relative">
          <AnimatePresence custom={direction}>
            {/* Variants are sets (objects) of pre-defined targets,
             and they can be referred by label*/}
            <motion.div 
              key={count}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.5 }}
              className={`absolute flex h-20 w-20 items-center justify-center ${colors[Math.abs(count) % 4]}`}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
export default Carousel;

const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500"];

// Custom variants, remember to automatically return an object in an arrow function
// is to wrap in ()
const variants = {
  enter: (direction: number) => ({ x: direction * 100 }),
  center: { x: 0 },
  exit: (direction: number) => ({ x: direction * -100 })
};