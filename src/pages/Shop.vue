<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/product'

import FilterSidebar from '@/components/shopComps/FilterSidebar.vue'
import ProductGrid from '@/components/shopComps/ProductGrid.vue'
import Topbar from '@/components/shopComps/Topbar.vue'
import PageHeader from '@/components/Reusables/PageHeader.vue'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
    <PageHeader>
      <template #path>Home</template>
      <template #page>Shop</template>
    </PageHeader>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <Topbar />

    <div class="grid grid-cols-12 gap-8 mt-8">
      <!-- Filters -->
      <aside class="col-span-12 lg:col-span-3">
        <FilterSidebar />
      </aside>

      <!-- Products -->
      <section class="col-span-12 lg:col-span-9">
        <ProductGrid />
      </section>
    </div>
  </div>
</template>
