<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

import { IOption } from "../../stores/cards/index";

import arrowDown from "../../assets/icons/arrow-down.svg";

interface IProps {
  options: IOption[];
  defaultOption: IOption | undefined;
  label?: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(["selectedOption"]);

const defaultOption = ref(props.defaultOption);
const showOptions = ref(false);

const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};

const selectedOption = (option: IOption) => {
  defaultOption.value = option;
  emits("selectedOption", option.id);
  showOptions.value = false;
};

const selectRef = ref<HTMLElement | null>(null);

const handleClickOutside = (e: MouseEvent) => {
  if (showOptions.value && !selectRef.value?.contains(e.target as Node)) {
    showOptions.value = false;
  }
};

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(
  () => props.defaultOption,
  (newValue) => {
    if (newValue && !defaultOption.value) {
      defaultOption.value = newValue;
    }
  }
);
</script>

<template>
  <div class="select" ref="selectRef">
    <div class="select__label">{{ props.label }}</div>
    <div class="select__selected-option" @click="toggleOptions">
      {{ defaultOption ? defaultOption.name : "" }}
      <img
        :src="arrowDown"
        alt="arrow"
        class="select__selected-option__image"
        :style="{ transform: showOptions ? 'rotate(180deg)' : '' }"
      />
    </div>
    <ul v-if="showOptions" class="select__options-list">
      <li
        class="select__options-list__option"
        v-for="option in props.options"
        :key="option.id"
        @click="selectedOption(option)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.select {
  position: relative;
  cursor: pointer;

  &__label {
    color: rgba(79, 79, 79, 1);
    font-size: 12px;
    padding-left: 16px;
  }

  &__selected-option {
    padding: 8px 16px;
    border: 1px solid #ccc;
    background-color: rgba(242, 242, 242, 1);
    margin-top: 6px;
    width: 288px;
    position: relative;

    &__image {
      position: absolute;
      right: 6px;
      top: 13px;
    }
  }

  &__options-list {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 5px 5px;
    list-style: none;
    padding: 0;
    margin: 0;

    &__option {
      padding: 8px 16px;
      cursor: pointer;

      @media (hover: hover) {
        &:hover {
          background-color: #f0f0f0;
        }
      }

      @media (hover: none) {
        &:active {
          background-color: #f0f0f0;
        }
      }
    }
  }
}
</style>
