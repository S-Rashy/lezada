import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const cartCount = computed(() => cart.value.length)
  
  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.price * item.qty, 0)
  })

  const addToCart = (product) => {
    const existingItem = cart.value.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.qty++
    } else {
      cart.value.push({ ...product, qty: 1 })
    }
  }
  return { cart, cartCount, cartTotal, addToCart }
})
