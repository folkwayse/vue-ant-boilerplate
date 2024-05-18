<template>
  <a-form :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
    <a-form-item
      label="Name"
      name="name"
      :rules="[{ required: true, message: 'Please input your genre name!' }]"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item
      label="Deskripsi"
      name="description"
      :rules="[{ required: true, message: 'Please generate the description' }]"
    >
      <a-textarea v-model:value="formState.description" />
    </a-form-item>
    <a-form-item
      label="Konten Dewasa"
      name="isMature"
      :rules="[{ required: false, message: 'Please generate the slug' }]"
    >
      <a-checkbox v-model:checked="formState.isMature" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useGenreStore } from "@/stores/genreStore";
const router = useRouter();
const genreStore = useGenreStore();

const formState = reactive({
  name: "",
  description: "",
  isMature: false,
});
onMounted(async () => {
  const id = router.currentRoute.value.params.id;
  const genreData = await genreStore.getGenreById(id);
  Object.assign(formState, genreData);
});
const onFinish = async (values) => {
  const id = router.currentRoute.value.params.id;
  await genreStore.updateGenre(id, values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>
