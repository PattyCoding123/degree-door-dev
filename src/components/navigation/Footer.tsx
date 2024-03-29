import Link from "next/link";
import { BsGithub } from "react-icons/bs";

const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-0 max-h-64 w-full bg-primary p-4 dark:bg-gray-900 sm:p-6">
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
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Resources
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <Link href="/about">
                  <p className="cursor-pointer hover:underline">About Us</p>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/PattyCoding123/degree-door-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="cursor-pointer hover:underline">GitHub</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="mt-4 flex text-sm text-gray-500 dark:text-gray-400 sm:text-center md:mt-0">
          © 2023 Degree Door™ All Rights Reserved.
        </span>
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          {/* Use pure HTML <a> tag for external links */}
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
