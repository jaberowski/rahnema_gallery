export interface Photo {
  id: number;
  category: string;
  url: string;
  photographer: string;
  alt: string;
  page_url: string;
  width: number;
  height: number;
  path: string;
}

export interface ILocalPhoto {
  src: string;
  id: number;
  alt: string;
}

export interface IGalleryProps {
  selectedCategory: string;
  searchQuery: string;
}

export interface IFilterSideBarProps {
  selectedCategory: string;
  searchQuery: string;
  handleChooseCategory: (a: string) => void;
  handleSearchQueryChange: (str: string) => void;
}
