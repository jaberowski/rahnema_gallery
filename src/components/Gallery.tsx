import { useCallback } from "react";
import useFetch from "../hooks/useFetch";
import { IGalleryProps, Photo } from "../types/types";
import { galleryClient } from "../api/galleryClient";

class ApiToLocalPhotoAdapter {
  src: string;
  id: number;
  alt: string;
  constructor(apiPhoto: Photo) {
    this.src = apiPhoto.url;
    this.id = apiPhoto.id;
    this.alt = apiPhoto.alt;
  }
}

function fetchGalleryData(url: string) {
  return galleryClient.get(url).then((res) => res.data);
}

function Gallery({ selectedCategory, searchQuery }: IGalleryProps) {
  const fetchApiPhotos = useCallback(() => {
    if (selectedCategory) {
      return fetchGalleryData(`categories/${selectedCategory}/photos`);
    } else if (searchQuery) {
      return fetchGalleryData(`photos?search=${searchQuery}`);
    } else {
      return fetchGalleryData(`photos`);
    }
  }, [selectedCategory, searchQuery]);

  const { data: apiPhotos, isLoading } = useFetch<Photo[]>(fetchApiPhotos, []);

  const localPhotos = apiPhotos.map(
    (apiPhoto) => new ApiToLocalPhotoAdapter(apiPhoto)
  );

  let content: JSX.Element;
  if (isLoading) {
    content = (
      <div className="h-full flex justify-center items-center text-2xl font-bold">
        Loading Photos
      </div>
    );
  } else if (localPhotos.length === 0) {
    content = (
      <div className="flex justify-center items-center w-full h-full text-2xl font-bold">
        No photo found
      </div>
    );
  } else {
    content = (
      <div className="max-h-[80%] grid grid-cols-3 grid-rows-3 gap-2">
        {localPhotos
          .filter((_, i) => i < 9)
          .map((photo) => (
            <img
              src={photo.src}
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
          {searchQuery && (
            <h3 className="text-lg font-semibold">
              Photos with "{searchQuery}" in it{" "}
            </h3>
          )}
        </div>
        {content}
      </div>
    </div>
  );
}

export default Gallery;
