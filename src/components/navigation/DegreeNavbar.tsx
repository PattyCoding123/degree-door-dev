import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import Dropdown from "../menus/Dropdown";
import FavoriteIndicator from "../FavoriteIndicator";
interface DegreeNavbarProps {
  active: "overview" | "reviews" | "write";
  degreeName: string;
  degreeId: string;
}

const DegreeNavbar: React.FC<DegreeNavbarProps> = ({
  active,
  degreeName,
  degreeId,
}) => {
  return (
    <nav className="m-auto flex w-full flex-col shadow-lg">
      {degreeName && (
        <header className="bg-gray-900 py-1">
          <h1 className="text-center font-bold text-white">{degreeName}</h1>
        </header>
      )}
      <div className="flex flex-col items-center justify-between gap-8 bg-gradient-to-b from-rose-100 to-teal-100 px-6 py-4 md:grid md:grid-cols-3">
        <Link href="/">
          <div className="navbar-brand col-span-1 flex cursor-pointer">
            <Image
              src="/degree_door_logo_filled.png"
              alt="Degree Door Logo"
              width={24}
              height={24}
            />
            <p className="font-bold">egree Door</p>
          </div>
        </Link>
        <ul className="flex flex-col items-center justify-center gap-10 md:col-span-1 md:flex-row md:gap-4">
          {/* Only render the links if the data exists */}
          {[
            {
              href: `/degree/${degreeId}`,
              label: "OVERVIEW",
              id: "overview",
            },
            {
              href: `/degree/${degreeId}/reviews`,
              label: "REVIEWS",
              id: "reviews",
            },
            {
              href: `/degree/${degreeId}/write`,
              label: "WRITE A REVIEW",
              id: "write",
            },
          ].map(({ href, label, id }) => {
            return (
              <li key={label} id={id}>
                <Link href={href}>
                  <p
                    className={clsx("font-bold hover:opacity-50", {
                      "text-indigo-600": active === id,
                    })}
                  >
                    {label}
                  </p>
                </Link>
              </li>
            );
          })}
          <li>
            <FavoriteIndicator degreeId={degreeId} />
          </li>
        </ul>
        <div className="flex justify-end md:col-span-1">
          <Dropdown color="black" />
        </div>
      </div>
    </nav>
  );
};

export default DegreeNavbar;
