<script setup>
import { ref } from 'vue'
import MainButton from '../Reusables/MainButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await authStore.login(email.value, password.value)
    router.push('/')
    console.log('Login response:', response)
  } catch (error) {
    console.error('Login error:', error)
  }
}
const showPassword = ref(false)
</script>

<template>
  <main class="w-145 bg-[#f3f3f3] p-8 space-y-5 mx-auto my-8 text-center">
    <h3 class="text-2xl text-[#333333]">Login</h3>
    <p class="text-[#666666]">Please login using your account details below.</p>

    <form @submit.prevent="handleLogin">
      <input type="email" placeholder="Email" v-model="email" />
      <div class="flex items-center justify-between w-full">
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          v-model="password"
        />
        <Icon icon="mdi:eye-outline" @click="showPassword = !showPassword" />
      </div>
      <div class="flex justify-between items-center my-4">
        <MainButton type="submit" class="w-[150px]">SIGN IN</MainButton>
        <RouterLink to="/auth/reset-password">
          <p>Forgot your Password?</p>
        </RouterLink>
      </div>
    </form>

    <RouterLink to="/auth/register" class="w-35"><p>Create Account</p></RouterLink>
  </main>
</template>

<style scoped>
input {
  display: block;
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 20px;
  background-color: white;
  outline: none;
}
::placeholder {
  color: #333333;
}
</style>
