import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

interface FavoriteDegreeProps {
  degreeId: string;
  degreeName: string;
}

const FavoriteDegree: React.FC<FavoriteDegreeProps> = ({
  degreeId,
  degreeName,
}) => {
  return (
    <Link href={`/degree/${degreeId}`}>
      <div
        className="flex min-w-[15rem] cursor-pointer rounded-xl border bg-[#f9f9f9]
      p-4 text-black shadow-sm transition duration-200 ease-in-out hover:scale-90"
      >
        <div className="flex gap-3">
          <AiFillStar className="text-2xl" color="#de9b61" />
          <p>{degreeName}</p>
        </div>
      </div>
    </Link>
  );
};

export default FavoriteDegree;
