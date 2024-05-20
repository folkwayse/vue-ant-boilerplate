<template>
  <a-panel>
    <h3>
      {{ mangaStore.manga.title }} - [ {{ mangaStore.manga.last_chapters }}]
    </h3>
  </a-panel>
  <a-panel>
    <span> get chapter Data</span>
    <a-input v-model:value="idKiryuuManga"></a-input>
    <a-button @click="getChaptersFromKiryuu">process</a-button>
  </a-panel>
  <a-list style="max-height: 300px; overflow: auto">
    <a-list-item
      @click="getDataFromKiryu(chapter.slug)"
      v-for="chapter in kiryuuChapters"
      :key="chapter.id"
    >
      <a>{{ chapter.chapter }}</a>
    </a-list-item>
  </a-list>
  <a-divider />
  <a-panel>
    <a-popover v-model:open="visibleIdKiryu" title="Title" trigger="click">
      <template #content> </template>
      <a-button type="primary">Get Data From Kiryuu</a-button>
    </a-popover>

    <a-input v-model:value="idkiryu"></a-input>
    <a-button @click="getDataFromKiryu">process</a-button>
  </a-panel>
  <a-divider />
  <a-form
    ref="formRef"
    :model="formState"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Chapter Name"
      name="name"
      :rules="[{ required: true, message: 'Please input your genre name!' }]"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item
      label="Chapter Number"
      name="chapter_number"
      :rules="[
        { required: true, message: 'Please generate the chapter_number' },
      ]"
    >
      <a-input-number v-model:value="formState.chapter_number" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>

    <a-form-item label="Add Image URL">
      <div style="display: flex; gap: 10px">
        <a-input v-model:value="newImageUrl" placeholder="Enter image URL" />
        <a-button @click="addImageUrl">Add Image</a-button>
      </div>
    </a-form-item>

    <a-form-item
      label="Content"
      name="content"
      v-if="formState.content.length > 0"
    >
      <ul>
        [Preview]
        <a-tag @click="Reupload">[Reupload]</a-tag>
        <a-tag>[{{ statusReupload }}]</a-tag>
        <li v-for="(url, index) in formState.content" :key="index">
          <a-image
            :src="url"
            alt="Image"
            style="max-width: 600px; margin-right: 10px"
          />
          <a-button @click="removeImageUrl(index)">Remove</a-button>
        </li>
      </ul>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useMangaStore } from "@/stores/mangaStore";
import { notification } from "ant-design-vue";
const visibleIdKiryu = ref(false);
const idkiryu = ref("hackgu-chapter-01");
const idKiryuuManga = ref("hackgu");
const router = useRouter();
const mangaStore = useMangaStore();
const kiryuuChapters = ref([]);
const statusReupload = ref("belum upload");
const formRef = ref(null);
onMounted(async () => {
  await mangaStore.getMangaById(router.currentRoute.value.params.id);
  idKiryuuManga.value = mangaStore.manga.slug;
});
const formState = reactive({
  name: "",
  chapter_number: null,
  content: [],
});

const newImageUrl = ref("");

const getChaptersFromKiryuu = async () => {
  const id = idKiryuuManga.value;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  };

  const response = await fetch(
    import.meta.env.VITE_API_URL + "kiryu/getmangadetailbyid",
    options
  );
  const jsonData = await response.json();
  const dataManga = jsonData.data;
  kiryuuChapters.value = dataManga.chapters;
};
const getImageFromUrl = async (url) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url,
    }),
  };

  const response = await fetch(
    import.meta.env.VITE_API_URL + "images/uploadfromurl",
    options
  );
  const jsonData = await response.json();
  return jsonData.imageurl;
};

const Reupload = async () => {
  statusReupload.value = "PROCESING ....";
  const images = formState.content;
  formState.content = [];

  for (let i = 0; i < images.length; i++) {
    console.log(images[i]);
    const newImageUrl = await getImageFromUrl(images[i]);
    formState.content.push(newImageUrl);
  }
  notification.open({
    message: "Reup Done",
    description: "",
  });
  statusReupload.value = "reup done";
};
const addImageUrl = () => {
  if (newImageUrl.value) {
    formState.imageUrls.push(newImageUrl.value);
    newImageUrl.value = "";
  }
};

const onFinish = async (values) => {
  try {
    // values.imageUrls = formState.imageUrls; // Ensure image URLs are included
    console.log(values);
    await mangaStore.addNewChapter(router.currentRoute.value.params.id, values);
    // router.push({ path: "/mangas" });
  } catch (error) {
    console.log(error);
  }
  formState.content = [];
};
const getDataFromKiryu = async (chapter) => {
  const id = chapter;
  console.log(id);
  const indexNow = kiryuuChapters.value.findIndex((item) => item.slug == id);
  const nextData = kiryuuChapters.value[indexNow - 1];
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  };

  const response = await fetch(
    import.meta.env.VITE_API_URL + "kiryu/getchaptersbyid",
    options
  );
  const jsonData = await response.json();
  console.log(jsonData.data);
  const dataManga = jsonData.data;
  formState.name = dataManga.title;
  formState.content = dataManga.content;
  try {
    let number = dataManga.title?.replace("Bahasa Indonesia", "");
    number = number.split(" ");
    number = number[number.length - 2];
    formState.chapter_number = parseFloat(number);
  } catch (error) {
    return;
  }


 
  statusReupload.value = "belum upload";

  await Reupload();
  formRef.value
    .validate()
    .then(() => {
      onFinish(formState);
    })
    .catch((errorInfo) => {
      onFinishFailed(errorInfo);
    });
  await getDataFromKiryu(nextData.slug);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>
