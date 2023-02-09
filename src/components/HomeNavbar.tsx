import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

import Searchbar from "./Searchbar";
import Dropdown from "./Dropdown";

const HomeNavbar: FC = () => {
  return (
    <nav className="max-w-screen bg-gray-900">
      <div className="flex w-full flex-col items-center gap-8 px-6 py-4 md:grid md:grid-cols-3">
        <Link href="/">
          <div className="navbar-brand col-span-1 flex cursor-pointer">
            <Image
              src="/degree_door_logo.png"
              alt="Degree Door Logo"
              width={24}
              height={24}
            />
            <p className="font-bold text-white">egree Door</p>
          </div>
        </Link>
        <div className="col-span-1 justify-self-center">
          <Searchbar />
        </div>
        <div className="col-span-1 items-center justify-self-end">
          <Dropdown color="white" />
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
