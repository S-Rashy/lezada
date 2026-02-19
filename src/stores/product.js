import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../helpers/axios'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const loading = ref(false)

    const totalProducts = computed(() => products.value.length)

  const fetchProducts = async (params = {}) => {
    loading.value = true

    try {
      const response = await api.get('/products', { params })
      products.value = response.data.data
      console.log(products.value)
          loading.value = false

    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  return { products, fetchProducts, totalProducts, loading }
})
