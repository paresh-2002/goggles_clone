import { CiSearch } from "react-icons/ci";
import { filterBySearch } from "../../utils/filterUtils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import spinningLoaders from "../../assets/loaderBlack.svg";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showList, setShowList] = useState(true);
  const [searching, setSearching] = useState(false);

  const changeHandler = (e) => {
    setSearch(e.target.value);
    if (!showList) setShowList(true);
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
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
      {/*{search && showList && (
        <ul className="absolute bg-amber-50 w-full max-h-72 overflow-auto rounded-b-md z-10">
          {searching ? (
            <li className="h-10 flex items-center justify-center">
              <img src={spinningLoaders} alt="Searching..." />
            </li>
          ) : filteredData.length ? (
            filteredData.map((product) => (
              <li key={product._id} className="">
                <CartItemCard
                  product={product}
                  isSearch={true}
                  setSearch={setSearch}
                />
              </li>
            ))
          ) : (
            <li className="h-10 flex items-center justify-center">
              No Item to show
            </li>
          )}
        </ul>
      )}*/}
    </>
  );
};

export default Search;
