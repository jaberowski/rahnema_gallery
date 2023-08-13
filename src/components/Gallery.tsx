import { useEffect, useState } from "react";
import axios from "axios";

type Photo = {
  id: number;
  category: string;
  url: string;
  photographer: string;
  alt: string;
  page_url: string;
  width: number;
  height: number;
  path: string;
};

function Gallery({ selectedCategory }: { selectedCategory: string }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    if (selectedCategory === "") {
      axios
        .get(`https://frontend-gallery.darkube.app/api/photos`)
        .then((res) => {
          setPhotos(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .get(
          `https://frontend-gallery.darkube.app/api/categories/${selectedCategory}/photos`
        )
        .then((res) => {
          setPhotos(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    //
  }, [selectedCategory]);

  let content: JSX.Element;
  if (isLoading) {
    content = (
      <div className="h-[80%] flex justify-center items-center">
        Loading Photos for {selectedCategory}
      </div>
    );
  } else {
    content = (
      <div className="max-h-[80%] grid grid-cols-3 grid-rows-3 gap-2">
        {photos
          .filter((_, i) => i < 9)
          .map((photo) => (
            <img
              src={photo.url}
              className="object-cover w-full h-full rounded-lg"
            ></img>
          ))}
      </div>
    );
  }

  return (
    <div className="w-full h-full max-h-screen p-4 ">
      <div className="w-full h-full rounded-lg flex flex-col items-center text-center p-4 gap-8 border-2 border-black bg-slate-200">
        <div>
          <h1 className="text-3xl font-bold">Wild Life Gallery</h1>
          {selectedCategory && (
            <h3 className="text-lg font-semibold">
              Photos for {selectedCategory} category
            </h3>
          )}
        </div>
        {content}
      </div>
    </div>
  );
}

export default Gallery;
