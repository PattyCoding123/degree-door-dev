import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { BsFillTrashFill } from "react-icons/bs";
import { useSession } from "next-auth/react";

import { type RouterOutputs } from "../utils/trpc";

interface ReviewProps {
  reviewPost: RouterOutputs["forum"]["getAllReviews"][0]; // Single review from procedure
  handleClick: () => void; // Function that sets the selectedId of review page and shows dialog.
}

/*
  The Review component will render an individual review for a specific degree page.
*/
const Review: React.FC<ReviewProps> = ({ reviewPost, handleClick }) => {
  const { data: sessionData } = useSession();
  const { course, pros, cons, id, userId } = reviewPost; // Destructure review post

  return (
    <>
      <article className="flex w-2/3 flex-col gap-4 rounded-xl border bg-gradient-to-b from-rose-100 to-teal-100 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-center text-lg font-bold">{course}</h1>
          {
            // ! Only render the delete button if the user wrote the review
            sessionData?.user?.id === userId && (
              <button type="button" onClick={handleClick}>
                <BsFillTrashFill id={id} className="cursor-pointer text-lg" />
              </button>
            )
          }
        </div>
        <section className="flex">
          <div className="flex w-16 items-center justify-center rounded border-2 border-green-700 bg-white p-2">
            <IoMdThumbsUp className="text-lg text-green-700" />
          </div>
          <div className="w-full rounded border-r-4 border-green-700 bg-white p-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">PROS</h2>
              <p className="text-md text-gray-600">{pros}</p>
            </div>
          </div>
        </section>
        <section className="flex">
          <div className="flex w-16 items-center justify-center rounded border-2 border-red-700 bg-white p-2">
            <IoMdThumbsDown className="text-lg text-red-700" />
          </div>
          <div className="w-full rounded border-r-4 border-red-700 bg-white p-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">CONS</h2>
              <p className="text-md text-gray-600">{cons}</p>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Review;
