<template>
  <a-row>
    <h3 class="mx-3">Manga</h3>

    <a-button :href="`/mangas/add`"> Add New Manga </a-button>
  </a-row>

  <a-table
    :dataSource="mangaStore.mangas"
    
    :columns="mangaStore.headers"
  >

    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <a-button class="btn-action" 
        :href="`/mangas/addchapter/${record.id}`"
          >Add new Chapters</a-button
        >
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
import { useMangaStore } from "@/stores/mangaStore";
const router = useRouter();
const mangaStore = useMangaStore();
onMounted(() => {
  mangaStore.fetchManga();
});


</script>
