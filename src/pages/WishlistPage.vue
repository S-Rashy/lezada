<script setup>
import { useWishlistStore } from '@/stores/wishlist'
import { computed } from 'vue'
import PageHeader from '@/components/Reusables/PageHeader.vue'
import ProductCard from '@/components/Reusables/ProductCard.vue'

const wishlistStore = useWishlistStore()

const wishlist = computed(() => wishlistStore.wishlist)
</script>

<template>
  <main class="bg-white">
    <div>
      <PageHeader>
        <template #path>Home</template>
        <template #page>Wishlist</template>
      </PageHeader>
    </div>

    <div v-if="wishlist.length > 0" class="grid grid-cols-3 gap-8 p-6" >
      <ProductCard v-for="(product, index) in wishlist" :key="index" :product="product" />
    </div>

    <div v-if="wishlist.length <= 0" class="space-y-4 py-20 px-8">
      <p class="text-4xl text-[#333333]">Your wishlist is currently empty!</p>
      <p class="text-[#777777]">Continue browsing <span class="font-medium text-[#333333] hover:underline"><a href="/">here</a></span></p>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
