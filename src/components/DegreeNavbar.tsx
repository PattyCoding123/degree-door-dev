import Image from "next/image"
import { BsFillGearFill } from "react-icons/bs"

const DegreeNavbar: React.FC = () => {
  return (
    <nav className="w-screen m-auto flex flex-col shadow-lg">
      <header className="bg-gray-900 py-1">
        <h1 className="font-bold text-white text-center">Computer Science</h1>
      </header>
      <div className="p-4 flex flex-col md:grid md:grid-cols-3 justify-between items-center gap-8 bg-gradient-to-b from-rose-100 to-teal-100">
        <div className="col-span-1 navbar-brand cursor-pointer flex">
          <Image src="/degree_door_logo_filled.png" alt="Degree Door Logo" width={24} height={24} />
          <p className="font-bold">egree Door</p>
        </div>
        <ul className="flex flex-col md:flex-row md:col-span-1 items-center justify-center gap-8 md:gap-4">
          <li>
            <p className="font-bold">OVERVIEW</p>
          </li>
          <li>
            <p className="font-bold">REVIEWS</p>
          </li>
          <li>
            <p className="font-bold">POST A REVIEW</p>
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