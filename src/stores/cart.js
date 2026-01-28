import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const cartCount = computed(() => cart.value.length)

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.price * item.qty, 0)
  })
  const existingItem = cart.value.find((item) => item.id === product.id)

  const addToCart = (product) => {
    if (existingItem) {
      existingItem.qty++
    } else {
      cart.value.push({ ...product, qty: 1 })
    }
  }

  const increaseQty = () => {
   if (existingItem) {
      existingItem.qty++
    } }
    
  const decreaseQty = () => {
   if (existingItem && existingItem.qty > 1) {
      existingItem.qty--
    } else{
        removeFromCart()
    }}
    const removeFromCart = () => {
        cart.value.filter((item) => item.id !== id )
    }
    const clearCart = () => {
        cart.value = []
    }
  return { cart, cartCount, cartTotal, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart }
})
