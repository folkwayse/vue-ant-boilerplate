import GenreList from "@/pages/genre/list.vue";
import GenreEdit from "@/pages/genre/edit.vue";
import GenreAdd from "@/pages/genre/add.vue";

const genreRoutes = [
  {
    path: "",
    component: GenreList,
  },
  {
    path: "add",
    component: GenreAdd,
  },
  {
    path: "edit/:id",
    component: GenreEdit,
  },
];

export default genreRoutes;
