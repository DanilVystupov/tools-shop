<script setup lang="ts">
import { ICard } from "../../../stores/cards";

import CardItem from "./CardItem.vue";

interface IProps {
  cards: ICard[];
}

const props = defineProps<IProps>();
</script>

<template>
  <ul class="cards-list">
    <li v-for="card in props.cards" :key="card.id" class="card-item">
      <CardItem :card="card" />
    </li>
  </ul>
</template>

<style lang="scss">
.cards-list {
  margin-top: 41px;
  display: flex;
  flex-wrap: wrap;
  gap: 44px;

  @media screen and (max-width: 1600px) {
    gap: 33px;
  }
}
</style>
