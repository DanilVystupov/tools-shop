<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, computed, onMounted, watch } from "vue";

import { ICard, IOption, useCardsStore } from "../../stores/cards";

import Select from "../../components/select/Select.vue";
import CardsList from "./components/CardsList.vue";

const cardStore = useCardsStore();

const { title, cards, materials, sortingOptions } = storeToRefs(cardStore);

const selectedMaterial = ref<{ id: number; name: string } | undefined>(
  materials.value[0]
);
const selectedSortingOption = ref<{ id: number; name: string } | undefined>(
  sortingOptions.value[0]
);

const filteredCards = computed(() => {
  return cards.value.filter(
    (card: ICard) => card.material === selectedMaterial.value?.id
  );
});

const handleSelectMaterial = (materialId: number) => {
  selectedMaterial.value = materials.value.find(
    (material: IOption) => material.id === materialId
  );
};

const sortingAndFilteredCards = computed(() => {
  const sortedCards = [...filteredCards.value];

  if (selectedSortingOption.value?.id === 1) {
    sortedCards.sort((a, b) => a.price.current_price - b.price.current_price);
  } else if (selectedSortingOption.value?.id === 2) {
    sortedCards.sort((a, b) => b.price.current_price - a.price.current_price);
  }

  return sortedCards;
});

const handleSortingOption = (optionId: number) => {
  selectedSortingOption.value = sortingOptions.value.find(
    (option: IOption) => option.id === optionId
  );
};

onMounted(async () => {
  await cardStore.fetchItems();
  await cardStore.fetchMaterials();
  await cardStore.fetchSortingOptions();
});

watch(
  () => sortingOptions.value,
  (newValue) => {
    selectedSortingOption.value = newValue[0];
  },
  { deep: true }
);

watch(
  () => materials.value,
  (newValue) => {
    selectedMaterial.value = newValue[0];
  },
  { deep: true }
);
</script>

<template>
  <div class="cards-container">
    <h1 class="cards-container__title">{{ title }}</h1>
    <div class="cards-container-selected-wrapper">
      <Select
        :label="'Сортировать по:'"
        :options="sortingOptions"
        :defaultOption="selectedSortingOption"
        @selectedOption="handleSortingOption"
      />

      <Select
        :label="'Материал'"
        :options="materials"
        :defaultOption="selectedMaterial"
        @selectedOption="handleSelectMaterial"
      />
    </div>
    <CardsList :cards="sortingAndFilteredCards" />
  </div>
</template>

<style lang="scss">
.cards-container {
  margin-top: 32px;

  &__title {
    font-weight: 600;
    font-size: 32px;
  }

  &-selected-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 32px;
  }
}
</style>
