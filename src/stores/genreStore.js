import { defineStore } from "pinia";

export const useGenreStore = defineStore("genre", {
  state: () => ({
    genres: [],
    headers : [
      { title: 'Name', dataIndex: 'name' },
      { title: 'slug', dataIndex: 'slug' },
      { title: 'action', dataIndex: 'action' },
    ]
  }),
  actions: {
    async fetchGenres() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}genres`);
      const data = await response.json();
      this.genres = data;
      
    },
    async getGenreById(id) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}genres/${id}`);
      const data = await response.json();
      return data;
    },
    async updateGenre(id, data) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}genres/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    },
    async createNewGenre(data) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}genres`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    },

  },
  getters: {},
});
