import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, type FC } from "react";
import useMeasure from "react-use-measure";

import { trpc } from "../utils/trpc";
import usePrevious from "../utils/usePrevious";
import LoadingCarousel from "./loading-ui/LoadingCarouselIndicator";

const Carousel: FC = () => {
  // Used to help determine the sliding direction by comparing it with prev
  const [count, setCount] = useState(1);
  const [current, setCurrent] = useState(0); // Keep track of data index
  const prev = usePrevious(count); // Used to compare with count
  const [ref, { width }] = useMeasure();

  const { data, isSuccess } = trpc.forum.getAllDegreePaths.useQuery(undefined);

  // Determines the direction by comparing count with prev
  const direction: number = typeof prev === "number" && count > prev ? 1 : -1;

  // Only render the carousel if the query is a success.
  // There will always be a degree.
  if (isSuccess) {
    return (
      <div className="mt-8 flex justify-center">
        {/* Slide the carousel to the left */}
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
          <AnimatePresence custom={{ direction, width }}>
            {/* Variants are sets (objects) of pre-defined targets,
                and they can be referred by label*/}
            <motion.div
              key={current}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
              custom={{ direction, width }}
              className="absolute flex h-full min-w-[15rem] items-center justify-center 
              rounded bg-gradient-to-b from-rose-100 to-teal-100"
            >
              {/* Null coalescing since Link href cannot be undefined */}
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
        {/* Slide the carousel to the right */}
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
    transition: { duration: 0.4 },
  }),
  center: { x: 0, transition: { duration: 0.4 } },
  exit: (custom: { direction: number; width: number }) => ({
    x: custom.direction * -custom.width,
    transition: { duration: 0.4 },
  }),
};
