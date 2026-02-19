<script setup>
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
</script>

<template>
  <div class="space-y-8">

    <!-- Category -->
    <div>
      <h3 class="font-medium text-lg mb-4">Category</h3>
      <select
        v-model="productStore.selectedCategory"
        class="w-full border px-3 py-2 text-sm"
      >
        <option :value="null">All categories</option>
        <option
          v-for="cat in productStore.categories"
          :key="cat"
          :value="cat"
        >
          {{ cat }}
        </option>
      </select>
    </div>

    <!-- Price -->
    <div>
      <h3 class="font-medium text-lg mb-4">Price</h3>
      <div class="flex gap-4">
        <input
          type="number"
          placeholder="Min"
          class="w-full border px-3 py-2 text-sm"
          v-model.number="productStore.minPrice"
        />
        <input
          type="number"
          placeholder="Max"
          class="w-full border px-3 py-2 text-sm"
          v-model.number="productStore.maxPrice"
        />
      </div>
    </div>

    <!-- Stock -->
    <div>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" v-model="productStore.inStockOnly" />
        <span class="text-sm">In stock only</span>
      </label>
    </div>

  </div>
</template>
