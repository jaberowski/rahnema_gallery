import "./App.css";
import { useState } from "react";
import FiltersSideBar from "./components/FiltersSideBar";
import Gallery from "./components/Gallery";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  function handleChooseCategory(category: string) {
    setSelectedCategory(category);
    setSearchQuery("");
  }

  function handleSearchQueryChange(str: string) {
    setSelectedCategory("");
    setSearchQuery(str);
  }

  return (
    <div className="w-10/12 mx-auto min-h-screen  grid grid-cols-5">
      <div className="basis  col-span-1">
        <FiltersSideBar
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          handleChooseCategory={handleChooseCategory}
          handleSearchQueryChange={handleSearchQueryChange}
        />
        <div>search</div>
      </div>
      <div className=" col-span-4">
        <Gallery
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}

export default App;
