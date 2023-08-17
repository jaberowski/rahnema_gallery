import { useCallback } from "react";
import axios from "axios";
import useFetchMany from "../hooks/useFetch";
import { IFilterSideBarProps } from "../types/types";

function FiltersSideBar({
  selectedCategory,
  searchQuery,
  handleChooseCategory,
  handleSearchQueryChange,
}: IFilterSideBarProps) {
  const fetchCategories = useCallback(() => {
    return axios
      .get(`https://frontend-gallery.darkube.app/api/categories`)
      .then((result) => result.data);
  }, []);

  const { data: categories, isLoading } = useFetchMany<string[]>(
    fetchCategories,
    []
  );

  return (
    <div className="w-full h-full p-4 ">
      <div className="w-full h-full  rounded-lg flex flex-col items-center text-center p-4 gap-8 border-2 border-black bg-slate-200">
        <div>
          <div>
            <h2 className="text-2xl font-bold">Catergories</h2>
            <p className="text-lg font-semibold  text-center">
              Select a catergory to filter result
            </p>
          </div>
          <ul>
            {isLoading ? (
              <div>is Loading</div>
            ) : (
              categories.map((c) => (
                <li
                  onClick={() => handleChooseCategory(c)}
                  className={`border-b-2 first-of-type:border-t-2 border-black p-1 ${
                    selectedCategory === c ? "text-blue-600" : ""
                  }`}
                >
                  {c}
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Search Bar</h2>
          <p className="text-lg font-semibold  text-center">
            Filter results by some word
          </p>
          <input
            type="text"
            className="rounded-lg border border-black p-1"
            placeholder="Enter your Query"
            value={searchQuery}
            onChange={(e) => handleSearchQueryChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default FiltersSideBar;
