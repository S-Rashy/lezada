import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/helpers/axios'

export const useOrderStore = defineStore('order', () => {
  const currentOrder = ref(null)
  const isLoading = ref(false)

  // Fetch an order by ID
  const fetchOrder = async (orderId) => {
    try {
      isLoading.value = true
      const res = await api.get(`/orders/${orderId}`)
      currentOrder.value = res.data.order
      return currentOrder.value
    } catch (err) {
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const clearOrder = () => {
    currentOrder.value = null
  }

  return {
    currentOrder,
    fetchOrder,
    clearOrder,
    isLoading,
  }
})
