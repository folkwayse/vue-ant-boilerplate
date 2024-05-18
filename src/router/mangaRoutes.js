import MangaList from "@/pages/manga/list.vue";
import MangaAdd from "@/pages/manga/add.vue";  // If GenreAdd is used for adding Manga as well
import GenreEdit from "@/pages/genre/edit.vue"; // If GenreEdit is used for editing Manga as well

const mangaRoutes = [
  {
    path: "",
    component: MangaList,
  },
  {
    path: "add",
    component: MangaAdd,
  },
  {
    path: "edit/:id",
    component: GenreEdit,
  },
];

export default mangaRoutes;
