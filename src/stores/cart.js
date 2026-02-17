import api from '@/helpers/axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const cartCount = computed(() => cart.value.length)

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart')
      cart.value = response.data.data
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  const addToCart = async (payload) => {
    const response = await api.post('/cart/add', payload)
    fetchCart()
  }

  const updateCart = async (payload) => {
    const response = await api.put(`/cart/${payload.id}`, payload)
    fetchCart()
    console.log(response)
  }
  // const increaseQty = (id) => {
  //   const existingItem = cart.value.find((item) => item.id === id)

  //   if (existingItem) {
  //     existingItem.qty++
  //   }
  // }

  // const decreaseQty = (id) => {
  //   const existingItem = cart.value.find((item) => item.id === id)

  //   if (existingItem && existingItem.qty > 1) {
  //     existingItem.qty--
  //   } else {
  //     removeFromCart(id)
  //   }
  // }
  const removeFromCart = async (id) => {
    try {
      await api.delete(`/cart/${id}`)
      await fetchCart()
    } catch (error) {
      console.error('Error removing cart item:', error)
    }
  }

 const clearCart = async () => {
  const previousCart = [...cart.value] 
  cart.value = [] 

  try {
    await api.delete('/cart/all')
  } catch (error) {
    cart.value = previousCart  
    console.error('Error clearing cart:', error)
    throw error
  }
}

  const getCartItems = computed(() => cart.value)
  return {
    cartCount,
    cartTotal,
    addToCart,
    fetchCart,
    updateCart,
    removeFromCart,
    clearCart,
    getCartItems,
  }
})
