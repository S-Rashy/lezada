import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlist = ref([])

  const wishlistCount = computed(() => wishlist.value.length)

  const isInWishlist = (id) => {
    return wishlist.value.some((item) => item.id === id)
  }

  const addToWishlist = (product) => {
    if (!isInWishlist(product.id)) {
      wishlist.value.push(product)
    }
  }

  const removeFromWishlist = (id) => {
    wishlist.value = wishlist.value.filter((item) => item.id !== id)
  }
  const clearWishlist = () => {
    wishlist.value = []
  }

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }
  return {
    wishlist,
    wishlistCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    toggleWishlist,
  }
})
