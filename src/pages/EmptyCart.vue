<script setup>
import MainButton from '@/components/Reusables/MainButton.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <main class="my-6 space-y-8 flex flex-col items-center">
    <div class="text-[#856404] bg-[#FFF3CD] w-full">
      <p class="p-4 text-center">Your shopping cart is currently empty!</p>
    </div>

    <Icon icon="material-symbols-light:add-shopping-cart" width="120"></Icon>

    <h5>You have no items in your shopping cart</h5>

    <MainButton class="flex items-center justify-center gap-1">
      <Icon icon="fluent:ios-arrow-24-regular"></Icon> CONTINUE SHOPPING</MainButton
    >
  </main>
</template>

<style lang="scss" scoped></style>
