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
    return degreePathQuery.data?.filter(item => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    })
  }, [query]);

  
  return (
    <div className="flex flex-col min-w-full">
      <div className="flex items-center justify-center z-10 text-green-600">
        <input 
          type="search"
          name="search"
          placeholder="Search for a degree..."
          value={query}
          className="h-8 px-5 pr-10 rounded-full text-sm focus:outline-none"
          onChange={e => setQuery(e.target.value)}
        />
        <BsSearch className="text-black relative right-8"/>
      </div>
      <div 
        className="flex flex-col items-center mt-8 h-2/5
        overflow-x-hidden overflow-y-auto no-scrollbar fixed z-10"
      >
        {filteredItems?.slice(0, 10).map((degree, index) => (
          <Link href={`/${degree.id}`} key={index}>
            <p>{degree.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Searchbar;