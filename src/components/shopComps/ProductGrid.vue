<script setup>
import { useProductStore } from '@/stores/product'
import ProductCard from '../Reusables/ProductCard.vue'

const productStore = useProductStore()
</script>

<template>
  <div v-if="productStore.loading" class="py-20 text-center text-gray-500">Loading products...</div>

  <div v-else-if="!productStore.filteredProducts.length" class="py-20 text-center text-gray-500">
    No products match your filters
  </div>

  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <ProductCard
      v-for="product in productStore.filteredProducts"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
