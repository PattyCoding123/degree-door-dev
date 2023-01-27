import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFillGearFill } from "react-icons/bs";

import Searchbar from "./Searchbar";

const HomeNavbar: React.FC = () => {
  return (
    <nav className="max-w-screen bg-gray-900">
      <div className="px-6 py-4 flex flex-col items-center gap-8 md:grid md:grid-cols-3 w-full">
        <Link href="/">
          <div className="col-span-1 navbar-brand cursor-pointer flex">
            <Image src="/degree_door_logo.png" alt="Degree Door Logo" width={24} height={24} />
            <p className="font-bold">egree Door</p>
          </div>
        </Link>
        <div className="col-span-1 justify-self-center">
          <Searchbar />
        </div>
        <div className="col-span-1 items-center justify-self-end">
          <BsFillGearFill className="text-lg text-white" />
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;