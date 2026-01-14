<script setup>
import { onMounted, computed } from 'vue'
import { useProductStore } from '../../stores/product'
import ProductCard from '../Reusables/ProductCard.vue'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
const allProducts = computed(() => productStore.products.slice(8, 16))
</script>

<template>
  <div class="grid grid-cols-3">
    <ProductCard v-for="(product, index) in allProducts" :key="index" :product="product" />
  </div>
</template>

<style lang="scss" scoped></style>
