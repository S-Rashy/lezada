<script setup lang="ts">
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
</script>

<template>
  <div class="flex flex-wrap justify-between items-center gap-4 border-b pb-4">
    <!-- View toggles -->
    <div class="flex gap-2">
      <button class="p-2 border rounded text-gray-500">▦</button>
      <button class="p-2 border rounded text-gray-500">▤</button>
    </div>

    <!-- Result count -->
    <p class="text-sm text-gray-500">
      Showing 1 - {{ productStore.products.length }} of {{ productStore.totalProducts }} result
    </p>

    <!-- Controls -->
    <div class="flex items-center gap-4">
      <select class="border px-3 py-1 text-sm">
        <option>12</option>
        <option>24</option>
        <option>48</option>
      </select>

      <select class="border px-3 py-1 text-sm">
        <option>Alphabetically, A-Z</option>
        <option>Alphabetically, Z-A</option>
        <option>Price, low to high</option>
      </select>
    </div>
  </div>
</template>
