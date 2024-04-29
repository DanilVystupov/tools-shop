<script setup lang="ts">
import { ref } from "vue";

const breadcrumbsItems = ref([
  {
    title: "Главная",
    disabled: false,
    href: "#",
  },
  {
    title: "Системы хранения",
    disabled: false,
    href: "#",
  },
  {
    title: "Комплекты стеллажных систем",
    disabled: true,
    href: "#",
  },
]);
</script>

<template>
  <v-breadcrumbs :items="breadcrumbsItems"></v-breadcrumbs>
</template>

<style lang="scss">
.v-breadcrumbs,
.v-breadcrumbs-item {
  padding: 0;
}

.v-breadcrumbs-item:not(:last-child) {
  opacity: 1;
  color: #ddd;
}

.v-breadcrumbs-divider {
  color: #ddd;
}

.v-breadcrumbs-item:last-child {
  opacity: 1;
  color: black;
}
</style>
