import { useEffect, useState } from "react";
import axios from "axios";

function FiltersSideBar({
  selectedCategory,
  searchQuery,
  handleChooseCategory,
  handleSearchQueryChange,
}: {
  selectedCategory: string;
  searchQuery: string;
  handleChooseCategory: (a: string) => void;
  handleSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://frontend-gallery.darkube.app/api/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
            onChange={(e) => handleSearchQueryChange(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default FiltersSideBar;
