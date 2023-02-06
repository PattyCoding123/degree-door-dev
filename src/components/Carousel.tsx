import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import useMeasure from "react-use-measure";

import { trpc } from "../utils/trpc";
import usePrevious from "../utils/usePrevious";

const Carousel: React.FC = () => {
  const [count, setCount] = useState(1);
  const [current, setCurrent] = useState(0);
  const prev = usePrevious(count);
  const [ref, { width }] = useMeasure();

  const { data, isSuccess } = trpc.forum.getAllDegreePaths.useQuery(undefined, {
    initialData: [],
  });

  const direction: number = typeof prev === "number" && count > prev ? 1 : -1;

  if (isSuccess) {
    return (
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            setCurrent(current !== 0 ? current - 1 : data.length - 1);
            setCount(count - 1);
          }}
        >
          <FiChevronLeft className="text-3xl" />
        </button>
        <div
          ref={ref}
          className="relative flex h-24 w-1/3 items-center justify-center
            overflow-hidden"
        >
          {/*Null coalescing since Link href cannot be optional*/}
          <AnimatePresence custom={{ direction, width }}>
            {/* Variants are sets (objects) of pre-defined targets,
                and they can be referred by label*/}
            <motion.div
              key={current}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              whileHover={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
              custom={{ direction, width }}
              className="absolute flex h-full items-center justify-center rounded 
                  bg-gradient-to-b from-rose-100 to-teal-100"
            >
              <Link
                href={`/${data[current]?.id ?? ""}`}
                className="h-full w-full"
              >
                <p className="p-8 text-lg text-black">{data[current]?.name}</p>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={() => {
            setCurrent(current !== data.length - 1 ? current + 1 : 0);
            setCount(count + 1);
          }}
        >
          <FiChevronRight className="text-3xl" />
        </button>
      </div>
    );
  }

  return null;
};
export default Carousel;

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
