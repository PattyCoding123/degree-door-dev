import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { BsFillGearFill } from "react-icons/bs";

interface DegreeNavbarProps {
  active: string;
  degreeName?: string;
  degreeId?: string;
}

const DegreeNavbar: React.FC<DegreeNavbarProps> = ({ active, degreeName, degreeId }) => {

  return (
    <nav className="max-w-screen m-auto flex flex-col shadow-lg">
      {degreeName && <header className="bg-gray-900 py-1">
        <h1 className="font-bold text-white text-center">{degreeName}</h1>
      </header>}
      <div className="px-6 py-4 flex flex-col md:grid md:grid-cols-3 justify-between items-center gap-8 bg-gradient-to-b from-rose-100 to-teal-100">
        <Link href="/">
          <div className="col-span-1 navbar-brand cursor-pointer flex">
            <Image src="/degree_door_logo_filled.png" alt="Degree Door Logo" width={24} height={24} />
            <p className="font-bold">egree Door</p>
          </div>
        </Link>
        <ul className="flex flex-col md:flex-row md:col-span-1 items-center justify-center gap-10 md:gap-4">
          {/* Only render the links if the data exists */}
          { degreeId &&
            [
              [`/${degreeId}`, "OVERVIEW", "overview"],
              [`/${degreeId}/reviews`, "REVIEWS", "reviews"],
              [`/${degreeId}/post`, "POST A REVIEW", "post"]
            ].map(([href, label, id]) => (
              <li key={label!} id={id!}>
                <Link href={href!}>
                  <p className={clsx("font-bold hover:opacity-50", {"text-indigo-600": active === id!})}>{label!}</p>
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