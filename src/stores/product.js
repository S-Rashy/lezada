import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../helpers/axios'
export const useProductStore = defineStore('product', () => {
  const products = ref([])

  const fetchProducts = async () => {
  //   try {
  //     const response = await fetch('https://fakestoreapi.com/products')
  //     const fetchedProducts = await response.json()
  //     products.value = fetchedProducts
  //   } catch (error) {
  //     console.error('Error fetching users:', error)
  //   }

    try{
      const response = await api.get('/products');
      products.value = response.data.data;
      console.log(products.value);
      
    }
    catch(error){
      console.error('Error fetching products:', error);
    }
  }




  return { products, fetchProducts }
})
