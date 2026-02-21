<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '../../stores/product'
import ProductCard from '../Reusables/ProductCard.vue'

const productStore = useProductStore()
const prodTab = ref('new')

const tabs = [
  { label: 'New', value: 'new' },
  { label: 'Popular', value: 'popular' },
  { label: 'Sale', value: 'sale' },
]

onMounted(() => {
  productStore.fetchProducts({ tab: prodTab.value })
})

const switchTab = (tabValue) => {
  prodTab.value = tabValue
  productStore.fetchProducts({ tab: tabValue })
}

const allProducts = computed(() => productStore.products)
</script>

<template>
  <main>
    <div class="flex justify-center gap-10 my-12">
      <h2
        v-for="tab in tabs"
        :key="tab.value"
        class="text-[48px] cursor-pointer hover:text-[#333333] transition-colors duration-300"
        :class="prodTab === tab.value ? 'text-[#333333]' : 'text-[#777]'"
        @click="switchTab(tab.value)"
      >
        {{ tab.label }}
      </h2>
    </div>
    <div class="grid grid-cols-3 gap-8">
      <ProductCard v-for="(product, index) in allProducts" :key="index" :product="product" />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
