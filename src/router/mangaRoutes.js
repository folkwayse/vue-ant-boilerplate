import MangaList from "@/pages/manga/list.vue";
import MangaAdd from "@/pages/manga/add.vue"; // If GenreAdd is used for adding Manga as well
import ChapterAdd from "@/pages/chapters/add.vue"; // If GenreEdit is used for editing Manga as well

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
    path: "addchapter/:id",
    component: ChapterAdd,
  },
];

export default mangaRoutes;
