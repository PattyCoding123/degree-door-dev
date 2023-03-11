import Link from "next/link";
import { BsGithub } from "react-icons/bs";

const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-0 max-h-48 w-full bg-white p-4 dark:bg-gray-900 sm:p-6">
      <div className="md:flex md:justify-between">
        <section className="mb-6 md:mb-0">
          <Link href="/" className="flex items-center">
            <span
              className="cursor-pointer self-center whitespace-nowrap text-2xl font-semibold
             text-black dark:text-white"
            >
              Degree Door
            </span>
          </Link>
        </section>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
          <section>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Resources
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-2">
                <Link href="/">
                  <p className="cursor-pointer hover:underline">Contact Us</p>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <p className="cursor-pointer hover:underline">About Us</p>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="flex text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2023 Degree Door™ All Rights Reserved.
        </span>
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <a
            href="https://github.com/PattyCoding123/degree-door-dev"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub />
            <span className="sr-only">GitHub account</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
