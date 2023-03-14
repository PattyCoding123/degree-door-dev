import { AiFillStar } from "react-icons/ai";

const FavoritesLoadingIndicator: React.FC = () => {
  return (
    <div className="flex animate-pulse gap-4">
      <div
        className="flex w-60 cursor-pointer rounded-xl bg-gray-200
        p-4 text-black shadow-sm transition"
      >
        <div className="flex gap-3">
          <AiFillStar className="text-2xl" color="#de9b61" />
          <p>Loading...</p>
        </div>
      </div>
      <div
        className="flex w-60 cursor-pointer rounded-xl border bg-gray-200
        p-4 text-black shadow-sm transition"
      >
        <div className="flex gap-3">
          <AiFillStar className="text-2xl" color="#de9b61" />
          <p>Loading...</p>
        </div>
      </div>
      <div
        className="flex w-60 cursor-pointer rounded-xl border bg-gray-200
        p-4 text-black shadow-sm transition"
      >
        <div className="flex gap-3">
          <AiFillStar className="text-2xl" color="#de9b61" />
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default FavoritesLoadingIndicator;
