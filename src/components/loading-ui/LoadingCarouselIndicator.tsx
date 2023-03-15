import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

// Component that will render a skeleton UI of the degree carousel.
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

export default LoadingCarousel;
