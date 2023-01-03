import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { BsFillTrashFill } from "react-icons/bs";

interface ReviewProps {
  course: string;
  pros: string;
  cons: string;
}

const Review: React.FC<ReviewProps> = ({ course, pros, cons }) => {
  return (
    <article className="w-2/3 p-5 mb-4 border bg-gradient-to-b from-rose-100 to-teal-100 rounded-xl shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-center font-bold">{course}</h2>
        <BsFillTrashFill className="text-xl"/>
      </div>
    </article>
  );
}

export default Review;