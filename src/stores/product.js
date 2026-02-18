import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../helpers/axios'

export const useProductStore = defineStore('product', () => {
  const products = ref([])

  const fetchProducts = async (params = {}) => {
    try {
      const response = await api.get('/products', { params })
      products.value = response.data.data
      console.log(products.value)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  return { products, fetchProducts }
})