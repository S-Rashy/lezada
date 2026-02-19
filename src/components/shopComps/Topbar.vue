<script setup>
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
</script>

<template>
  <div class="border-b pb-4">
    <p class="text-sm text-gray-500">
      Showing {{ productStore.filteredProducts.length }}
      of {{ productStore.products.length }} results
    </p>
  </div>
</template>
