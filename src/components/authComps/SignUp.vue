<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import MainButton from '../Reusables/MainButton.vue'
import { toast } from 'vue-sonner'
import { Icon } from '@iconify/vue'
const authStore = useAuthStore()

const router = useRouter()

const form = reactive({
  firstname: '',
  lastname: '',
  email: '',
  phone_number: '',
  address: '',
  password: '',
})
const showPassword = ref(false)

const register = async () => {
  try {
    const name = `${form.firstname} ${form.lastname}`.trim()

    await authStore.register({
      name: name,
      email: form.email,
      phone_number: form.phone_number,
      address: form.address,
      password: form.password,
    })
    toast.success(`Welcome aboard, ${name}!`)

    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <main class="w-145 bg-[#f3f3f3] p-8 space-y-5 mx-auto my-8">
    <h3 class="text-2xl text-[#333333] text-center">Create Account</h3>
    <p class="text-[#666666] text-center">Please Register using account details below.</p>

    <form @submit.prevent="register">
      <label for="firstname">First Name</label>
      <input id="firstname" type="text" placeholder="First Name" v-model="form.firstname" />

      <label for="lastname">Last Name</label>
      <input id="lastname" type="text" placeholder="Last Name" v-model="form.lastname" />

      <label for="email">Email</label>
      <input id="email" type="email" placeholder="Email" v-model="form.email" />

      <div class="flex items-center justify-between w-full bg-white pr-4">
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          v-model="form.password"
        />
        <Icon
          :icon="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
          @click="showPassword = !showPassword"
          class="cursor-pointer text-gray-600"
        />
      </div>

      <div class="flex justify-between items-center my-4">
        <MainButton type="submit" class="w-[150px]">CREATE</MainButton>
      </div>
    </form>

    <RouterLink to="/">
      <p>Return to Store</p>
    </RouterLink>
  </main>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 6px;
  color: #333333;
}
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
