import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '../helpers/axios'

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlist = ref([])

  const wishlistCount = computed(() => wishlist.value.length)

  const isInWishlist = (id) => {
    return wishlist.value.some((item) => item.id === id)
  }

  const fetchWishlist = async () => {
    try {
      const response = await api.get('/wishlist')
      wishlist.value = response.data.data
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    }
  }

  const addToWishlist = async (product) => {
    if (isInWishlist(product.id)) return
    wishlist.value.push(product)

    try {
      await api.post('/wishlist', { product_id: product.id })
    } catch (error) {
      wishlist.value = wishlist.value.filter((item) => item.id !== product.id)
      console.error('Error adding to wishlist:', error)
      throw error
    }
  }

  const removeFromWishlist = async (id) => {
    const previousWishlist = [...wishlist.value]
    wishlist.value = wishlist.value.filter((item) => item.id !== id)
    try {
      await api.delete(`/wishlist/${id}`)
    } catch (error) {
      wishlist.value = previousWishlist
      console.error('Error removing from wishlist:', error)
      throw error 
    }
  }
  const clearWishlist = async () => {
    const previousWishlist = [...wishlist.value]

    wishlist.value = []
    try {
      await api.delete('/wishlist')
    } catch (error) {
      wishlist.value = previousWishlist
      console.error('Error clearing wishlist:', error)
      throw error
    }
  }

  const toggleWishlist = async (product) => {
      const inWishlist = isInWishlist(product.id)

    if (inWishlist) {
      await removeFromWishlist(product.id)
    } else {
      await addToWishlist(product)
    }
  }
  return {
    wishlist,
    wishlistCount,
    isInWishlist,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    toggleWishlist,
  }
})
