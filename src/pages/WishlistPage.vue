<script setup>
import { useWishlistStore } from '@/stores/wishlist'
import { computed } from 'vue';
const wishlistStore = useWishlistStore()

const wishlist = computed(() => wishlistStore.wishlist)

</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
