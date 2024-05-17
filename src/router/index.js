import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layouts/AppLayouts.vue";
import Genrelist from "@/pages/genre/list.vue";

const routes = [
  {
    path: "/",

    component: Layout,
    children: [
      {
        path: "",
        component: Genrelist,
      },
      {
        path: "genres",
        children: [
          {
            path: "",
            component: Genrelist,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
