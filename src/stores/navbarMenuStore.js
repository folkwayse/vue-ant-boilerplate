import { defineStore } from "pinia";
import { h } from "vue";
export const useNavbarMenu = defineStore("NavbarMenu", {
  state: () => ({
    selectedMenuKey: ["dashboard"],
    navbarMenu: [
        {
            key: "dashboard",
            label: h(
              "a",
              {
                href: "/",
              },
              "dashboard"
            ),
            title: "dashboard",
          },
          {
            key: "mangas",
            label: h(
              "a",
              {
                href: "/mangas",
              },
              "mangas"
            ),
            title: "mangas",
          },
      {
        key: "genres",
        label: h(
          "a",
          {
            href: "/genres",
          },
          "genres"
        ),
        title: "genres",
      },
    ],
  }),
  actions: {
    setSelectedMenuKey(key) {
      console.log("", key);
      this.selectedMenuKey[0] = key;
    },
  },
  getters: {},
});
