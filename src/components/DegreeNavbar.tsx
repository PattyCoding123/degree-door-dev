import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { BsFillGearFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

interface DegreeNavbarProps {
  active: string;
}

const DegreeNavbar: React.FC<DegreeNavbarProps> = ({ active }) => {
  const { degree } = useRouter().query as { degree: string | undefined };

  // Dependent query, will not run unless degree is definied: !!variable => boolean
  const degreeQuery = trpc.forum.getDegreeInfo.useQuery({ degreeId: degree! }, { enabled: !!degree });

  return (
    <nav className="max-w-screen m-auto flex flex-col shadow-lg">
      <header className="bg-gray-900 py-1">
        <h1 className="font-bold text-white text-center">{degreeQuery.data?.name!}</h1>
      </header>
      <div className="px-6 py-4 flex flex-col md:grid md:grid-cols-3 justify-between items-center gap-8 bg-gradient-to-b from-rose-100 to-teal-100">
        <Link href="/">
          <div className="col-span-1 navbar-brand cursor-pointer flex">
            <Image src="/degree_door_logo_filled.png" alt="Degree Door Logo" width={24} height={24} />
            <p className="font-bold">egree Door</p>
          </div>
        </Link>
        <ul className="flex flex-col md:flex-row md:col-span-1 items-center justify-center gap-10 md:gap-4">
          {
            [
              [`/${degreeQuery.data?.id!}`, "OVERVIEW", "overview"],
              [`/${degreeQuery.data?.id!}/reviews`, "REVIEWS", "reviews"],
              [`/${degreeQuery.data?.id!}/post`, "POST A REVIEW", "post"]
            ].map(([href, label, id]) => (
              <li key={label} id={id}>
                <Link href={href!}>
                  <p className={clsx("font-bold hover:opacity-50", {"text-indigo-600": active === id})}>{label!}</p>
                </Link>
              </li>
            ))
          }
        </ul>
        <div className="flex md:col-span-1 justify-end">
          <BsFillGearFill className="text-lg" />
        </div>
      </div>
    </nav>
  );
}

export default DegreeNavbar;