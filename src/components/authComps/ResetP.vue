<script setup>
import MainButton from '../Reusables/MainButton.vue'
</script>

<template>
  <main class="w-145 bg-[#f3f3f3] p-8 space-y-5 mx-auto my-8 text-center">
    <h3 class="text-2xl text-[#333333]">Reset Your Password</h3>
    <p class="text-[#666666]">We will send you an email to reset your password.</p>

    <form action="">
      <input type="email" placeholder="Email" />

      <div class="flex justify-between items-center my-4">
        <MainButton type="submit" class="w-[150px]">SUBMIT</MainButton>
        <RouterLink to="/account/login">
            <p>Cancel</p>
        </RouterLink>
      </div>
    </form>

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
