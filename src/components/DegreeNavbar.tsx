import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { BsFillGearFill } from "react-icons/bs";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

interface DegreeNavbarProps {
  active: string;
}

const DegreeNavbar: React.FC<DegreeNavbarProps> = ({ active }) => {
  const router = useRouter();
  const { degree } = router.query as { degree: string };
  const degreeQuery = trpc.forum.getDegreeInfo.useQuery({ degreeId: degree }, { enabled: false });

  useEffect(() => {
    if (!router.isReady) return;
    degreeQuery.refetch();
  }, [router.isReady])

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
          <li>
            <Link href={`/${degreeQuery.data?.id!}`}>
              <p className={clsx("font-bold hover:opacity-50", {"text-indigo-500": active === "overview"})}>OVERVIEW</p>
            </Link>
          </li>
          <li>
            <Link href={`/${degreeQuery.data?.id!}/reviews`}>
              <p className={clsx("font-bold hover:opacity-50", {"text-indigo-500": active === "reviews"})}>REVIEWS</p>
            </Link>
          </li>
          <li>
            <Link href={`/${degreeQuery.data?.id!}/post`}>
              <p className={clsx("font-bold hover:opacity-50", {"text-indigo-500": active === "post"})}>POST A REVIEW</p>
            </Link>
          </li>
        </ul>
        <div className="flex md:col-span-1 justify-end">
          <BsFillGearFill className="text-lg" />
        </div>
      </div>
    </nav>
  );
}

export default DegreeNavbar;