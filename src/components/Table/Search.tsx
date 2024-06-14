import { useState } from "react";
import { SearchIcon } from "../../assets/icons";

interface SearchTableProps {
  searchQuery?: string;
  placeholder?: string;
  onInput?: any;
}

const TableSearch = ({
  searchQuery,
  onInput,
  placeholder,
}: SearchTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const onSearchInput = (e: any) => {
    setSearchTerm(e.target.value);

    if (e.target.value !== "") {
      onInput(e.target.value);
    } else {
      onInput(" ");
    }
  };

  return (
    <div className="relative border p-1 rounded-md px-2 md:w-[200px]">
      <input
        onInput={onSearchInput}
        type="text"
        className="border-none focus:border-none focus:outline-none text-sm placeholder:text-[#B9B8B8]"
        placeholder={placeholder}
      />
      <div className="absolute top-0 right-[6px] h-full flex items-center justify-center">
        <SearchIcon />
      </div>
    </div>
  );
};

export default TableSearch;
