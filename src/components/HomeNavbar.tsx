import Image from "next/image";
import Link from "next/link";
import { BsFillGearFill } from "react-icons/bs";

const HomeNavbar: React.FC = () => {
  return (
    <nav className="max-w-screen bg-gray-900">
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <Link href="/">
          <div className="col-span-1 navbar-brand cursor-pointer flex">
            <Image src="/degree_door_logo.png" alt="Degree Door Logo" width={24} height={24} />
            <p className="font-bold">egree Door</p>
          </div>
        </Link>
        <BsFillGearFill className="text-lg text-white" />
      </div>
    </nav>
  );
}

export default HomeNavbar;