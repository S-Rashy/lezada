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

  const shippingAddress = ref(null)
  const billingAddress = ref(null)
  const setShippingAddress = (address) => {
    shippingAddress.value = address
  }

  const setBillingAddress = (address) => {
    billingAddress.value = address
  }
  // const getShippingAddress = computed(() => shippingAddress.value)
  // const getBillingAddress = computed(() => billingAddress.value)

  const checkout = async (checkoutData) => {
    // setShippingAddress(checkoutData.shipping_address)
    // setBillingAddress(checkoutData.billing_address)
    try {
      shippingAddress.value = checkoutData.shipping_address
      billingAddress.value = checkoutData.billing_address
      const response = await api.post('/orders/checkout', {
        payment_method: checkoutData.payment_method,
        shipping_address: checkoutData.shipping_address,
        billing_address: checkoutData.billing_address,
      })

      cart.value = []

      return response.data
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }
  return {
    cartCount,
    cartTotal,
    addToCart,
    fetchCart,
    updateCart,
    removeFromCart,
    clearCart,
    getCartItems,
    checkout,
    shippingAddress,
    billingAddress,
    // getShippingAddress,
    // getBillingAddress,
  }
})
