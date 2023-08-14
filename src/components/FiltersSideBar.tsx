import { useEffect, useState } from "react";
import axios from "axios";

function FiltersSideBar({
  setSelectedCategory,
  selectedCategory,
}: {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
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
                onClick={() => setSelectedCategory(c)}
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
    </div>
  );
}

export default FiltersSideBar;
