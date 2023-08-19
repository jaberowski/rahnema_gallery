import axios from "axios";

export const galleryClient = axios.create({
  baseURL: "https://frontend-gallery.darkube.app/api/",
});
