<template>
  <a-row>
    <a-popover v-model:open="visibleIdKiryu" title="Title" trigger="click">
      <template #content>
        <a-input v-model:value="idkiryu"></a-input>
        <a-button @click="getDataFromKiryu">process</a-button>
      </template>
      <a-button type="primary">Get Data From Kiryuu</a-button>
    </a-popover>
  </a-row>
  <a-form
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 15 }"
    :model="formState"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Title"
      name="title"
      :rules="[{ required: true, message: 'Please input your genre title!' }]"
    >
      <a-input v-model:value="formState.title" />
    </a-form-item>
    <a-form-item
      label="poster"
      name="poster"
      :rules="[{ required: true, message: 'Please input your genre poster!' }]"
    >
      <a-input-group compact>
        <a-row>
          <a-input v-model:value="formState.poster" />

          <a-popover
            v-model:open="visibleInputUrl"
            title="Title"
            trigger="click"
          >
            <template #content>
              <a-input v-model:value="remoteUrl"></a-input>
              <a-button @click="getImageFromUrl">process</a-button>
            </template>
            <a-button type="primary">From Url</a-button>
          </a-popover>
        </a-row>
        <a-image
          :src="formState.poster"
          style="margin: 45px; max-width: 150px"
        />
      </a-input-group>
    </a-form-item>

    <a-form-item
      label="language"
      name="language"
      :rules="[{ required: true, message: 'Please input your  language!' }]"
    >
      <a-input v-model:value="formState.language" />
    </a-form-item>
    <a-form-item
      label="alternative_title"
      name="alternative_title"
      :rules="[
        {
          required: true,
          message: 'Please input your  alternative_title!',
        },
      ]"
    >
      <a-textarea v-model:value="formState.alternative_title" />
    </a-form-item>
    <a-form-item
      label="description"
      name="description"
      :rules="[{ required: true, message: 'Please input your  language!' }]"
    >
      <a-textarea v-model:value="formState.description" />
    </a-form-item>

  
   
    <a-form-item
      label="Sudah Complete ? "
      name="status"
      :rules="[{ required: true, message: 'Please input your  status!' }]"
    >
      <a-switch v-model:checked="formState.status" />
    </a-form-item>
    <a-form-item label="type"
    name="type"
    :rules="[{ required: true, message: 'Please input your type of manga!' }]"
    >
      <a-radio-group v-model:value="formState.type">
        <a-radio value="manhua">Manhua</a-radio>
        <a-radio value="manhwa">manhwa</a-radio>
        <a-radio value="manga">manga</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item
      label="release_year"
      name="release_year"
      :rules="[{ required: true, message: 'Please input your  release_year!' }]"
    >
      <a-input-number v-model:value="formState.release_year" />
    </a-form-item>
    <a-form-item
      label="author"
      name="author"
      :rules="[{ required: true, message: 'Please input your  author!' }]"
    >
      <a-input v-model:value="formState.author" />
    </a-form-item>
    <a-form-item
      label="artist"
      name="artist"
      :rules="[{ required: true, message: 'Please input your  artist!' }]"
    >
      <a-input v-model:value="formState.artist" />
    </a-form-item>
    <a-form-item
      label="serialization"
      name="serialization"
      :rules="[
        { required: true, message: 'Please input your  serialization!' },
      ]"
    >
      <a-input v-model:value="formState.serialization" />
    </a-form-item>

  
    <a-form-item
      label="Genres"
      name="genre"
      :rules="[{ required: true, message: 'Please input your  Genres!' }]"
    >
   
      <a-select
        v-model:value="formState.genre"
        :fieldNames="{ label: 'name', value: 'id' }"
        mode="multiple"
        style="width: 100%"
        placeholder="Please select genre"
        optionFilterProp="name"
        
        :options="genreStore.genres"
      ></a-select>
    </a-form-item>
    <v-row>
      Sugested Genre : {{ sugestedGenres }}
    </v-row>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useGenreStore } from "@/stores/genreStore";
import { useMangaStore } from "@/stores/mangaStore";
const router = useRouter();
const genreStore = useGenreStore();
const mangaStore = useMangaStore();
const visibleInputUrl = ref(false);
const remoteUrl = ref("");
const visibleIdKiryu = ref(false);
const idkiryu = ref("hackgu");
const dataKiryu = ref([]);
const sugestedGenres = ref([]);

onMounted(() => {
  genreStore.fetchGenres()
})
const getDataFromKiryu = async () => {
  const id = idkiryu.value;

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
  console.log(jsonData.data);
  const dataManga = jsonData.data;
  formState.title = dataManga.title;
  formState.description = dataManga.description;
  formState.isMature = dataManga.isMature == 1 ? true : false;
  remoteUrl.value = dataManga.cover;
  formState.language = 'indonesia'
  formState.status = dataManga.status;
  formState.description = dataManga.synopsis;
  formState.type = dataManga.type;
  formState.release_year = parseInt(dataManga.published);
  formState.author = dataManga.author;
  formState.artist = dataManga.author;
  formState.serialization = dataManga.serialization;
  formState.alternative_title = dataManga.subtitle;
  sugestedGenres.value = dataManga.genres;
  formState.id = dataManga.id;
};
const formState = reactive({
 
});
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const getImageFromUrl = async () => {
  const url = remoteUrl.value;

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
  formState.poster = jsonData.imageurl;
};
const onFinish = async (values) => {
  try {
    await mangaStore.createNewManga(values);
    router.push({ path: "/mangas" });
  } catch (error) {
    console.log(error);
  }
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>
