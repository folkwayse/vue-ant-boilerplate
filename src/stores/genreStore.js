import { defineStore } from 'pinia';

export const useGenreStore = defineStore('genre', {
  state: () => ({
    genres: []
  }),
  actions: {
    setGenres(newGenres) {
      this.genres = newGenres;
    },
    addGenre(genre) {
      this.genres.push(genre);
    },
    removeGenre(genre) {
      this.genres = this.genres.filter(g => g !== genre);
    }
  },
  getters: {
    genreCount: (state) => state.genres.length,
    getGenres: (state) => state.genres,
  }
});
