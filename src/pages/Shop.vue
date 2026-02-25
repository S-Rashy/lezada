<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProductStore } from '@/stores/product'

// import FilterSidebar from '@/components/shopComps/FilterSidebar.vue'
// import ProductGrid from '@/components/shopComps/ProductGrid.vue'
// import Topbar from '@/components/shopComps/Topbar.vue'
import PageHeader from '@/components/Reusables/PageHeader.vue'
import ProductCard from '@/components/Reusables/ProductCard.vue'

const productStore = useProductStore()
const products = computed(() => productStore.getProducts)
const currentPage = ref(1)
const perPage = ref(10)
const lastPage = computed(() => productStore.getPagination.last_page)

onMounted(async () => {
  await productStore.fetchProducts({
    per_page: perPage.value,
    page: currentPage.value,
  })
})

watch([currentPage, perPage], () => {
  productStore.fetchProducts({
    per_page: perPage.value,
    page: currentPage.value,
  })
})

const previous = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
const next = () => {
  if (currentPage.value < lastPage.value) {
    currentPage.value++
  }
}
</script>

<template>
  <PageHeader>
    <template #path>Home</template>
    <template #page>Shop</template>
  </PageHeader>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <!-- <Topbar /> -->

    <div class="flex items-center justify-center gap-24 mt-4">
      <h3>
        Showing
        {{ (currentPage - 1) * perPage + 1 }}
        –
        {{ (currentPage - 1) * perPage + products.length }}
        of {{ productStore.getPagination?.total || 0 }} result
      </h3>

      <div class="space-x-2">
        <span>Show</span>
        <select v-model="perPage" class="border p-2">
          <option :value="10">10</option>
          <option :value="15">15</option>
          <option :value="20">20</option>
          <option :value="25">25</option>
        </select>
        <span>per page</span>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-8 mt-8">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />

      <!-- Filters -->
      <!-- <aside class="col-span-12 lg:col-span-3">
        <FilterSidebar />
      </aside> -->

      <!-- Products -->
      <!-- <section class="col-span-12 lg:col-span-9">
        <ProductGrid />
      </section> -->
    </div>
  </div>

  <div class="mt-6 flex gap-5 w-full justify-center">
    <button @click="previous">prev</button>
    <button
      v-for="page in lastPage"
      :key="page"
      @click="currentPage = page"
      class="p-2 cursor-pointer border-b border-transparent hover:text-[#333333] hover:border-b-[#333333]"
      :class="currentPage === page ? 'border-b text-[#333333]' : 'text-[#777777]'"
    >
      {{ page }}
    </button>
    <button @click="next">next</button>
  </div>
</template>
