<script setup>
import MainButton from '../Reusables/MainButton.vue'
const email = ref('')
const password = ref('')
</script>

<template>
  <main class="w-145 bg-[#f3f3f3] p-8 space-y-5 mx-auto my-8 text-center">
    <h3 class="text-2xl text-[#333333]">Login</h3>
    <p class="text-[#666666]">Please login using your account details below.</p>

    <form action="">
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <div class="flex justify-between items-center my-4">
        <MainButton type="submit" class="w-[150px]">SIGN IN</MainButton>
        <RouterLink to="/account/reset-password">
          <p>Forgot your Password?</p>
        </RouterLink>
      </div>
    </form>

    <RouterLink to="/account/register" class="w-35"><p>Create Account</p></RouterLink>
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
