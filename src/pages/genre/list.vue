<template>
  <a-row>
    <h3 class="mx-3">Genres</h3>

    <a-button :href="`/genres/add`"> Add New Genre </a-button>
  </a-row>
  <a-table
    :dataSource="genreStore.genres"
    :pagination="false"
    :columns="genreStore.headers"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <a-button class="btn-action" danger @click="edit(record)"
          >Edit</a-button
        >
        <a-button
          class="btn-action"
          danger
          @click="genreStore.deleteGenre(record)"
          >Delete</a-button
        >
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGenreStore } from "@/stores/genreStore";
const router = useRouter();
const genreStore = useGenreStore();
onMounted(() => {
  genreStore.fetchGenres();
});

const edit = (genre) => {
  console.log(genre);
  router.push("/genres/edit/" + genre.id);
};
</script>
