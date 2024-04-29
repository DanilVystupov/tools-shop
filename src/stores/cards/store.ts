import { defineStore } from 'pinia'

import { ICard, IOption, IState } from './storeTypes'

import itemsData from './items.json'
import materialsData from './materials.json'
import sortingOptionsData from './sortingOptions.json'

export const useCardsStore = defineStore('cards', {
    state: (): IState => ({
        cards: [],
        title: 'Комплекты стеллажных систем',
        materials: [],
        sortingOptions: []
    }),

    actions: {
        async fetchItems() {
            const response = await itemsData
            const items: ICard[] = response
            this.setCards(items)
        },

        async fetchMaterials() {
            const response = await materialsData
            const materials: IOption[] = response
            this.setMaterials(materials)
        },

        async fetchSortingOptions() {
            const response = await sortingOptionsData
            const sortingOptions: IOption[] = response
            this.setSortingOptions(sortingOptions)
        },

        setCards(cards: ICard[]) {
            this.cards = cards
        },

        setMaterials(materials: IOption[]) {
            this.materials = materials
        },

        setSortingOptions(sortingOptions: IOption[]) {
            this.sortingOptions = sortingOptions
        }
    }
})
