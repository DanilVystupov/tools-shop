<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

import { ICard } from "../../../stores/cards";

import basketSvg from "../../../assets/icons/basket.svg";
import checkmarkSvg from "../../../assets/icons/checkmark.svg";
import heartSvg from "../../../assets/icons/heart.svg";
import checkedHeartSvg from "../../../assets/icons/checked-heart.svg";

interface IProps {
  card: ICard;
}

const props = defineProps<IProps>();

const basketStorageKey = `isAddedInBasket_${props.card.id}`;
const favoriteStorageKey = `isAddedInFavorite_${props.card.id}`;

const isAddedInBasket = ref(false);
const isAddedInFavorite = ref(false);

const basketIcon = computed(() =>
  isAddedInBasket.value ? checkmarkSvg : basketSvg
);

const favoriteIcon = computed(() =>
  isAddedInFavorite.value ? checkedHeartSvg : heartSvg
);

const toggleAddedCardInBasket = () => {
  isAddedInBasket.value = !isAddedInBasket.value;
};

const toggleAddedInFavorite = () => {
  isAddedInFavorite.value = !isAddedInFavorite.value;
};

watch(
  () => isAddedInBasket.value,
  () => {
    localStorage.setItem(
      basketStorageKey,
      JSON.stringify(isAddedInBasket.value)
    );
  }
);

watch(
  () => isAddedInFavorite.value,
  () => {
    localStorage.setItem(
      favoriteStorageKey,
      JSON.stringify(isAddedInFavorite.value)
    );
  }
);

onMounted(() => {
  const addedCardInBasket = localStorage.getItem(basketStorageKey);
  const addedCardInFavorite = localStorage.getItem(favoriteStorageKey);

  if (addedCardInBasket) {
    isAddedInBasket.value = JSON.parse(addedCardInBasket);
  }

  if (addedCardInFavorite) {
    isAddedInFavorite.value = JSON.parse(addedCardInFavorite);
  }
});
</script>

<template>
  <span v-if="props.card.isSale" class="card-item__text-salary">Скидка</span>

  <div class="card-item__image">
    <img
      class="card-item__image-item"
      :src="props.card.image.url"
      :alt="props.card.name"
    />
  </div>

  <div class="card-item-info">
    <div class="card-item-info__code" v-if="props.card.code">
      {{ props.card.code }}
    </div>
    <div class="card-item-info__name">{{ props.card.name }}</div>

    <div class="card-item-info__footer">
      <div class="card-item-info__footer-price">
        <span
          v-if="props.card.price.old_price"
          class="card-item-info__footer-price__old"
        >
          {{ props.card.price.old_price }}
        </span>
        <span class="card-item-info__footer-price__current">
          {{ props.card.price.current_price }}&#8381;
        </span>
      </div>

      <div class="card-item-info__footer-icons">
        <img
          class="card-item-info__footer-icons__basket"
          :src="basketIcon"
          alt="корзина"
          @click="toggleAddedCardInBasket"
        />
        <img
          class="card-item-info__footer-icons__favorites"
          :src="favoriteIcon"
          alt="избранное"
          @click="toggleAddedInFavorite"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card-item {
  position: relative;
  width: 22%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(238, 238, 238, 1);
  padding: 12px;

  @media screen and (max-width: 1550px) {
    width: 30%;
  }

  @media screen and (max-width: 1280px) {
    width: 45%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  &__text-salary {
    position: absolute;
    top: 8px;
    left: 0;
    color: #fff;
    background: rgba(235, 87, 87, 1);
    padding: 3px 16px;
  }

  &__image {
    display: flex;
    justify-content: center;
    cursor: pointer;
    &-item {
      width: 238px;
      height: 238px;
    }
  }

  &-info {
    &__code {
      color: rgba(136, 136, 136, 1);
      font-size: 10px;
      margin-top: 23px;
    }

    &__name {
      font-weight: 500;
      margin-top: 6px;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;

      &-price {
        &__old {
          text-decoration: line-through;
          color: rgba(136, 136, 136, 1);
          margin-right: 9px;
        }
      }

      &-icons {
        &__basket {
          width: 20px;
          height: 20px;
          margin-right: 11px;
          cursor: pointer;
          transition: transform 0.3s ease;

          @media (hover: hover) {
            &:hover {
              transform: scale(1.1);
            }
          }

          @media (hover: none) {
            &:active {
              transform: scale(1.1);
            }
          }
        }

        &__favorites {
          cursor: pointer;
          transition: transform 0.3s ease;
          fill: red;
          stroke: red;

          @media (hover: hover) {
            &:hover {
              transform: scale(1.1);
            }
          }

          @media (hover: none) {
            &:active {
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }
}
</style>
