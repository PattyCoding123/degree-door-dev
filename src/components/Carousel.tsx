import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { useState, type FC } from "react";
import useMeasure from "react-use-measure";

import { trpc } from "../utils/trpc";
import usePrevious from "../utils/usePrevious";

const Carousel: FC = () => {
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
            setCurrent((current) =>
              current !== 0 ? current - 1 : data.length - 1
            );
            setCount((count) => count - 1);
          }}
        >
          <FiChevronLeft className="text-3xl" />
        </button>
        <div
          ref={ref}
          className="relative flex h-28 w-2/3 items-center justify-center
            overflow-hidden md:w-1/3"
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
              className="absolute flex h-full min-w-[15rem] items-center justify-center 
                  rounded bg-gradient-to-b from-rose-100 to-teal-100"
            >
              <Link
                href={`/degree/${data[current]?.id ?? ""}`}
                className="h-full w-full"
              >
                <p className="flex h-full w-full items-center justify-center p-8 text-lg text-black">
                  {data[current]?.name}
                </p>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={() => {
            setCurrent((current) =>
              current !== data.length - 1 ? current + 1 : 0
            );
            setCount((count) => count + 1);
          }}
        >
          <FiChevronRight className="text-3xl" />
        </button>
      </div>
    );
  }

  return <LoadingCarousel />;
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

const LoadingCarousel = () => {
  return (
    <div className="mt-8 flex justify-center">
      <button>
        <FiChevronLeft className="text-3xl" />
      </button>
      <div
        className="relative flex h-28 w-1/3 items-center
            justify-center overflow-hidden"
      >
        <div
          className="absolute flex h-full w-60 cursor-pointer items-center justify-center 
                  rounded bg-gradient-to-b from-rose-100 to-teal-100 duration-300 hover:scale-90"
        >
          <ImSpinner2 className="animate-spin text-black" />
        </div>
      </div>
      <button>
        <FiChevronRight className="text-3xl" />
      </button>
    </div>
  );
};
