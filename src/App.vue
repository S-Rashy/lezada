<script setup>
import { onMounted } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from './stores/product'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const productStore = useProductStore()

onMounted(async () => {
  try {
    await wishlistStore.fetchWishlist()
    await cartStore.fetchCart()
    await productStore.fetchProducts()
  } catch (error) {
    console.error('Failed to fetch wishlist:', error)
  }
})
</script>


<template>

  <RouterView/>
  
</template>

<style scoped>
</style>
