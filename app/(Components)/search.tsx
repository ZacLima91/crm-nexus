"use client"

import { SearchIcon } from "lucide-react";
import { useApi } from "@/providers/api-provider";

export function Search() {

  const { setSearchTerm, searchTerm } = useApi();

 

  return (
    <div className="bg-white w-80 h-10 px-2 rounded-lg flex justify-between items-center space-x-2">
      <SearchIcon width={22} className="text-gray-600" />
      <input
        className="w-full h-full border-none focus:outline-none text-gray-600 text-sm"
        placeholder="Procurar..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
    </div>
  );
}
