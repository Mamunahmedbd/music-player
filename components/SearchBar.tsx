import React, { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="p-4 w-full">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for releases or tracks..."
        className="w-full p-2 bg-gray-800 text-white rounded-md"
      />
    </div>
  );
};

export default SearchBar;
