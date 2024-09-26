import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showList, setShowList] = useState(true);
  const [searching, setSearching] = useState(false);

  const submitHandler = () => {};

  const changeHandler = (e) => {
    setSearch(e.target.value);
    if (!showList) setShowList(true);
  };
  return (
    <form
      onSubmit={submitHandler}
      className={`flex items-center bg-black/[0.075] px-3 ${
        search && showList ? "rounded-t-md" : "rounded-full"
      } text-sm transition`}
    >
      <input
        className="w-full py-2 px-3 bg-transparent focus:outline-none"
        type="search"
        value={search}
        placeholder="Search Glasses"
        onChange={changeHandler}
      />
      <CiSearch />
    </form>
  );
};

export default Search;
