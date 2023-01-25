import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { BsFillTrashFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { RouterOutputs } from "../utils/trpc";

interface ReviewProps {
  reviewPost: RouterOutputs["forum"]["getAllReviews"][0];
  handleClick: (reviewId: string) => void;
}

const Review: React.FC<ReviewProps> = ({ reviewPost, handleClick }) => {
  const { data: sessionData } = useSession();
  const { course, pros, cons, id, userId } = reviewPost;
  return (
    <article className="w-2/3 p-4 border bg-gradient-to-b from-rose-100 to-teal-100 rounded-xl shadow-2xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-center text-lg font-bold">{course}</h1>
        { sessionData?.user?.id === userId && 
          <button type="button" onClick={() => handleClick(id)}>
            <BsFillTrashFill id={id} className="text-lg cursor-pointer" />
          </button>
        }
      </div>
      <section className="flex">
        <div className="bg-white border-2 border-green-700 w-16 p-2 flex justify-center items-center rounded">
          <IoMdThumbsUp className="text-lg text-green-700" />
        </div>
        <div className="bg-white border-r-4 border-green-700 w-full p-4 rounded">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">PROS</h2>
            <p className="text-gray-600 text-md">{pros}</p>
          </div>
        </div>
      </section>
      <section className="flex">
        <div className="bg-white border-2 border-red-700 w-16 p-2 flex justify-center items-center rounded">
          <IoMdThumbsDown className="text-lg text-red-700" />
        </div>
        <div className="bg-white border-r-4 border-red-700 w-full p-4 rounded">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">CONS</h2>
            <p className="text-gray-600 text-md">{cons}</p>
          </div>
        </div>
      </section>
    </article>
  );
}

export default Review;