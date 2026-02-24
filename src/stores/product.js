import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../helpers/axios'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const loading = ref(false)
  const pagination = ref(null)

  // const minPrice = ref(null)
  // const maxPrice = ref(null)
  // const selectedCategory = ref(null)
  // const inStockOnly = ref(false)

  const totalProducts = computed(() => products.value.length)

  const fetchProducts = async (params = {}) => {
    loading.value = true

    try {
      const response = await api.get('/products', { params })
      products.value = response.data.data
      console.log(products.value)
      pagination.value = { ...response.data }
      delete pagination.value.data
      loading.value = false
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const getProducts = computed(() => products.value)
  const getPagination = computed(() => pagination.value)
  const getLoadingState = computed(() => loading.value)

  

  // const categories = computed(() => {
  //   return [...new Set(products.value.map((p) => p.category))]
  // })

  // const filteredProducts = computed(() => {
  //   return products.value.filter((product) => {
  //     if (minPrice.value !== null && product.price < minPrice.value) return false
  //     if (maxPrice.value !== null && product.price > maxPrice.value) return false
  //     if (selectedCategory.value && product.category !== selectedCategory.value) return false
  //     if (inStockOnly.value && product.stock <= 0) return false
  //     return true
  //   })

  // })

  // async function fetchAllForPage() {
  //   loading.value = true

  //   try {
  //     const response = await api.get('/products', {
  //       params: {
  //         page: 1,
  //         per_page: 1000,
  //         category: selectedCategory.value,
  //         min_price: minPrice.value || undefined,
  //         max_price: maxPrice.value || undefined,
  //         in_stock: inStockOnly.value || undefined,
  //       },
  //     })

  //     products.value = response.data.data
  //   } catch (err) {
  //     console.error(err)
  //   } finally {
  //     loading.value = false
  //   }
  // }

  return {
    products,
    fetchProducts,
    totalProducts,
    loading,
    getPagination,
    getProducts,
    // categories,
    // filteredProducts,
    // fetchAllForPage,
    // minPrice,
    // maxPrice,
    // selectedCategory,
    // inStockOnly,
  }
})
