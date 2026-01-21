<script setup>
import MainButton from '../Reusables/MainButton.vue'
</script>

<template>
  <main class="w-145 bg-[#f3f3f3] p-8 space-y-5 mx-auto my-8">
    <h3 class="text-2xl text-[#333333] text-center">Create Account</h3>
    <p class="text-[#666666] text-center">Please Register using account details below.</p>

    <form action="">
      <label for="firstname">First Name</label>
      <input id="firstname" type="text" placeholder="First Name" />

      <label for="lastname">Last Name</label>
      <input id="lastname" type="text" placeholder="Last Name" />

      <label for="email">Email</label>
      <input id="email" type="email" placeholder="Email" />
      <label for="password">Password</label>
      <input id="password" type="password" placeholder="Password" />

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
