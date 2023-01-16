import { BsSearch } from "react-icons/bs";
import { trpc } from "../utils/trpc";
import { useState, useMemo } from "react";
import Link from "next/link";
interface DegreePath {
  id: string;
  name: string;
}

const Searchbar: React.FC = () => {
  const [query, setQuery] = useState("");
  const degreePathQuery = trpc.forum.getAllDegreePaths.useQuery<DegreePath>();

  const filteredItems = useMemo(() => {
    if (query === "") return;
    return degreePathQuery.data?.filter(item => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    })
  }, [query]);

  
  return (
    <div className="flex flex-col">
      <div 
        className="flex items-center justify-between z-10 text-gray-600 w-80 bg-white
        rounded-full relative"
      >
        <input 
          type="search"
          name="search"
          placeholder="Search for a degree..."
          value={query}
          className="h-8 px-5 text-sm focus:outline-none rounded-full w-full"
          onChange={e => setQuery(e.target.value)}
        />
        <BsSearch className="text-black absolute right-2" />
      </div>
      <div 
        className="flex flex-col items-center mt-10 h-2/5
        overflow-x-hidden overflow-y-auto no-scrollbar fixed z-10"
      >
        {filteredItems?.slice(0, 10).map((degree, index) => (
          <Link href={`/${degree.id}`} key={index}>
            <div 
              className="degree-item bg-white z-50 w-80 h-8 flex items-center p-4 
            text-black border-b-2 border-gray-600"
            >
              <p>{degree.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Searchbar;