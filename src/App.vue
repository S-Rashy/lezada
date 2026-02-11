<script setup>
import { onMounted } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

onMounted(async () => {
  try {
    await wishlistStore.fetchWishlist()
    await cartStore.fetchCart()
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
