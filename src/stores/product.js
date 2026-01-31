import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useProductStore = defineStore('product', () => {
  const products = ref([])

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const fetchedProducts = await response.json()
      products.value = fetchedProducts
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  return { products, fetchProducts }
})
