<template>
  <div class="logo" />
  <a-menu
    v-model:selectedKeys="navbarMenuStore.selected"
    mode="vertical"
    :items="navbarMenuStore.navbarMenu"
  />
</template>
<script setup>
import { ref, computed, h } from "vue";
import { useNavbarMenu } from "@/stores/navbarMenuStore";
const navbarMenuStore = useNavbarMenu();
const items = ref();
</script>
