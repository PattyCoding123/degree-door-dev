import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { BsFillTrashFill } from "react-icons/bs";
import date from "date-and-time";
import { type RouterOutputs } from "../utils/trpc";

interface ReviewProps {
  reviewPost: RouterOutputs["forum"]["getAllReviews"][0]; // Single review from procedure
  canDelete: boolean;
  handleClick: () => void; // Function that sets the selectedId of review page and shows dialog.
}

/*
  The Review component will render an individual review for a specific degree page.
*/
const Review: React.FC<ReviewProps> = ({
  reviewPost,
  handleClick,
  canDelete,
}) => {
  const { course, pros, cons, id, createdAt } = reviewPost; // Destructure review post
  const datetime = date.format(createdAt, "YYYY-MM-DD");
  const formattedDate = date.format(createdAt, "MMM DD, YYYY");
  return (
    <>
      <article className="flex w-2/3 flex-col gap-4 rounded-xl border bg-slate-200 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-center text-lg font-bold">{course}</h1>
          {
            // ! Only render the delete button if the user wrote the review
            canDelete && (
              <button type="button" onClick={handleClick}>
                <BsFillTrashFill id={id} className="cursor-pointer text-lg" />
              </button>
            )
          }
        </div>
        <section className="flex">
          <div className="flex w-16 items-center justify-center rounded border-2 border-green-700 bg-primary p-2">
            <IoMdThumbsUp className="text-lg text-green-700" />
          </div>
          <div className="w-full rounded border-r-4 border-green-700 bg-primary p-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">PROS</h2>
              <p className="text-md text-gray-600">{pros}</p>
            </div>
          </div>
        </section>
        <section className="flex">
          <div className="flex w-16 items-center justify-center rounded border-2 border-red-700 bg-primary p-2">
            <IoMdThumbsDown className="text-lg text-red-700" />
          </div>
          <div className="w-full rounded border-r-4 border-red-700 bg-primary p-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">CONS</h2>
              <p className="text-md text-gray-600">{cons}</p>
            </div>
          </div>
        </section>
        <time className="font-bold" dateTime={formattedDate}>
          {formattedDate}
        </time>
      </article>
    </>
  );
};

export default Review;
