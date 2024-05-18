import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layouts/AppLayouts.vue";
import genreRoutes from "./genreRoutes";
import mangaRoutes from "./mangaRoutes";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/pages/genre/list.vue"),
      },
      {
        path: "genres",
        children: genreRoutes,
      },
      {
        path: "mangas",
        children: mangaRoutes,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
