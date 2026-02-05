<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '../../stores/product'
import ProductCard from '../Reusables/ProductCard.vue'

const productStore = useProductStore()
// const prodTab = ref(1)

onMounted(() => {
  productStore.fetchProducts()
})
const allProducts = computed(() => productStore.products)

const displayedProducts = computed(() => {
  // if (prodTab.value === 1) {
  //   return productStore.products.slice(0, 6)
  // } else if (prodTab.value === 2) {
  //   return productStore.products.slice(6, 13)
  // } else if (prodTab.value === 3) {
  //   return productStore.products.slice(13, 20)
  // }
})
</script>

<template>
  <main class="">
    <div class="flex justify-center gap-10 my-12">
      <!-- @click="prodTab = 1" -->
      <!-- :class="prodTab === 1 ? 'text-[#333333]' : 'text-[#777]'" -->
      <h2
      class="text-[48px] hover:text-[#333333] cursor-pointer transition-colors duration-300"
      >
        New
      </h2>
      <!-- @click="prodTab = 2" -->
      <!-- :class="prodTab === 2 ? 'text-[#333333]' : 'text-[#777]'" -->
      <h2
      class="text-[48px] hover:text-[#333333] cursor-pointer transition-colors duration-300"
      >
        Popular
      </h2>
      <!-- @click="prodTab = 3" -->
      <!-- :class="prodTab === 3 ? 'text-[#333333]' : 'text-[#777]'" -->
      <h2
      class="text-[48px] hover:text-[#333333] cursor-pointer transition-colors duration-300"
      >
        Sale
      </h2>
    </div>
    <div class="grid grid-cols-3 gap-8">
      <ProductCard v-for="(product, index) in allProducts" :key="index" :product="product" />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
