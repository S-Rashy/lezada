// stores/order.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/helpers/axios'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])         // List of all orders
  const currentOrder = ref(null) // Single order
  const isLoading = ref(false)
  const error = ref(null)

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      isLoading.value = true
      const res = await api.get('/orders')
      // Save the array inside data.data
      orders.value = res.data.data.data || []
    } catch (err) {
      error.value = err
      console.error('Error fetching orders:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Fetch a single order by ID
  const fetchOrderById = async (orderId) => {
    try {
      isLoading.value = true
      const res = await api.get(`/orders/${orderId}`)
      currentOrder.value = res.data.data || null
      return currentOrder.value
    } catch (err) {
      error.value = err
      console.error('Error fetching order:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Clear the current order
  const clearCurrentOrder = () => {
    currentOrder.value = null
  }

  return {
    orders,
    currentOrder,
    isLoading,
    error,
    fetchOrders,
    fetchOrderById,
    clearCurrentOrder,
  }
})
