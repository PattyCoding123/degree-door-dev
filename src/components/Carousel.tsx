import { motion } from "framer-motion";
import { useState } from "react";

const Carousel: React.FC = () => {
  const [count, setCount] = useState(1);
  return (
    <div className="text-white">
      <div className="flex justify-between">
        <button onClick={() => setCount(count - 1)}>Prev</button>
        <button onClick={() => setCount(count + 1)}>Next</button>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center
        bg-gray-700">
          <div className="flex h-20 w-20 items-center justify-center bg-red-500">
            {count}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Carousel;