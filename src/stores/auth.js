import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../helpers/axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('authToken') || null)
  //   const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const user = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  // const user = ref(null)

  const setToken = (authToken) => {
    token.value = authToken
    localStorage.setItem('authToken', authToken)
  }

  const clearToken = () => {
    token.value = null
    localStorage.removeItem('authToken')
  }

  const setUser = (userData) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const clearUser = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  // const isAuthenticated = computed(() => token.value !== null)
    const isAuthenticated = computed(() => !!token.value)


  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password })
      setToken(response.data.token)
      setUser(response.data.user)

      return response
    } catch (error) {
      throw error
    }
  }

  const register = async (data) => {
    try {
      const response = await api.post('/register', data)
      setToken(response.data.token)
      setUser(response.data.user)
      console.log(response.data.message);
      
      return response
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  const logout = () => {
    clearToken()
    clearUser()
  }
  const getUser = computed(() => user.value)

  return {
    token,
    user,
    isAuthenticated,
    login,
    setToken,
    clearToken,
    setUser,
    clearUser,
    getUser,
    register,
    logout,
  }
})
