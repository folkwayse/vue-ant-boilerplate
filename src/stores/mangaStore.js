import { defineStore } from "pinia";

export const useMangaStore = defineStore("manga", {
  state: () => ({
    mangas: [],
    headers: [
      { title: "Title", dataIndex: "title" },
      { title: "last Chap", dataIndex: "last_chapters" },
      { title: "action", dataIndex: "action" },
    ],
  }),
  actions: {
    async fetchManga() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}mangas`);
      const data = await response.json();
      this.mangas = data;
    },
    async createNewManga(data) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}mangas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const dataJson = await response.json();
      } catch (error) {
        console.error(error);
      }

    },
  },
  getters: {},
});
