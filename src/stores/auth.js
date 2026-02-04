import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../helpers/axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('authToken') || null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  const setToken = (authToken) => {
    localStorage.setItem('authToken', authToken)
    token.value = authToken
  }

  const clearToken = () => {
    localStorage.removeItem('authToken')
    token.value = null
  }

  const setUser = (userData) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const clearUser = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const isAuthenticated = computed(() => token.value !== null)

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
  const getUser = computed(() => user.value);

  return { token, user, isAuthenticated, login, setToken, clearToken, setUser, clearUser, getUser }
})
