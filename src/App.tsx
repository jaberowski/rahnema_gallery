import "./App.css";
import { useState } from "react";
import CategoriesSideBar from "./components/CategoriesSideBar";
import Gallery from "./components/Gallery";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("dog");

  return (
    <div className="w-10/12 mx-auto min-h-screen  grid grid-cols-5">
      <div className="basis  col-span-1">
        <CategoriesSideBar setSelectedCategory={setSelectedCategory} />
      </div>
      <div className=" col-span-4">
        <Gallery selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}

export default App;
