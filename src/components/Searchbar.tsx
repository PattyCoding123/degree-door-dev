import { BsSearch } from "react-icons/bs";
import { trpc } from "../utils/trpc";
import { useState, useMemo, type FC } from "react";
import Link from "next/link";

const Searchbar: FC = () => {
  const [query, setQuery] = useState("");
  const degreePathQuery = trpc.forum.getAllDegreePaths.useQuery();

  const filteredItems = useMemo(() => {
    if (query === "") return;
    return degreePathQuery.data?.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [degreePathQuery.data, query]);

  return (
    <div className="flex flex-col">
      <div
        className="relative z-10 flex w-80 items-center justify-between rounded-full
        bg-white text-gray-600"
      >
        <input
          type="search"
          name="search"
          placeholder="Search for a degree..."
          value={query}
          className="h-8 w-full rounded-full px-5 text-sm focus:outline-none"
          onChange={(e) => setQuery(e.target.value)}
        />
        <BsSearch className="absolute right-2 text-black" />
      </div>
      <div
        className="no-scrollbar fixed z-10 mt-10 flex
        h-2/5 flex-col items-center overflow-y-auto overflow-x-hidden"
      >
        {filteredItems?.slice(0, 10).map((degree, index) => (
          <Link href={`/degree/${degree.id}`} key={index}>
            <div
              className="degree-item z-50 flex h-8 w-80 items-center border-b-2 border-gray-600 
            bg-white p-4 text-black hover:bg-gray-300"
            >
              <p>{degree.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
