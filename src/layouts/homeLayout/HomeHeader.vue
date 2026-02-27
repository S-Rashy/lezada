<script setup>
import CatalogDD from '@/components/headerComps/CatalogDD.vue'
import CartSlide from '@/pages/CartSlide.vue'
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const wishlistCount = computed(() => wishlistStore.wishlistCount)
const cartCount = computed(() => cartStore.cartCount)

const cartOpen = ref(false)
const mobileOpen = ref(false)
</script>

<template>
  <main class="fixed bg-white w-full top-0 left-0 right-0 z-50 shadow-sm">
    <header class="px-4 py-4 md:px-8 md:py-6 flex items-center justify-between">

      <!-- Mobile Hamburger -->
      <button 
        @click="mobileOpen = !mobileOpen"
        class="md:hidden"
      >
        <Icon 
          :icon="mobileOpen ? 'mdi:close' : 'mdi:menu'" 
          width="26" 
          height="26" 
        />
      </button>

      <!-- Logo -->
      <a href="/" class="flex justify-center md:justify-start">
        <img
          class="w-28 md:w-auto"
          src="https://lezada-demo.myshopify.com/cdn/shop/files/logo_300x300.png?v=1613746425"
          alt="Logo"
        />
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:block">
        <ul class="flex gap-10 font-[15px] text-[#777] items-center">
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>

          <div class="group relative inline-block border">
            <li>
              <a href="/" class="flex border items-center gap-1">
                Catalog
                <Icon icon="ep:arrow-down" width="16" height="16" />
              </a>
              <!-- <CatalogDD /> -->
            </li>
          </div>

          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact us</a></li>
        </ul>
      </nav>

      <!-- Right Icons -->
      <div class="flex gap-4 md:gap-8 items-center">

        <Icon 
          icon="tdesign:search" 
          width="24" 
          height="24" 
          class="cursor-pointer hidden sm:block" 
        />

        <RouterLink to="/account">
          <Icon icon="ri:user-fill" width="24" height="24" />
        </RouterLink>

        <RouterLink to="/wishlist" class="relative">
          <p
            v-if="wishlistCount > 0"
            class="text-white bg-[#DB4444] rounded-full w-4 h-4 text-[11px] flex items-center justify-center absolute -top-1 -right-1 z-20"
          >
            {{ wishlistCount }}
          </p>
          <Icon
            icon="solar:heart-outline"
            width="24"
            height="24"
            class="relative z-10 transition-all duration-200 hover:scale-110"
          />
        </RouterLink>

        <button @click="cartOpen = true" class="relative">
          <p
            v-if="cartCount > 0"
            class="text-white bg-[#DB4444] rounded-full w-4 h-4 text-[11px] flex items-center justify-center absolute -top-1 -right-1 z-20"
          >
            {{ cartCount }}
          </p>
          <Icon icon="vaadin:cart" width="24" height="24" />
        </button>
      </div>
    </header>

    <!-- Mobile Navigation -->
    <div 
      v-if="mobileOpen"
      class="md:hidden bg-white border-t px-6 py-6 space-y-4 text-[#555] font-medium shadow-md"
    >
      <a href="/" class="block">Home</a>
      <a href="/shop" class="block">Shop</a>
      <a href="/" class="block">Catalog</a>
      <a href="/about" class="block">About Us</a>
      <a href="/contact" class="block">Contact us</a>
    </div>
  </main>

  <!-- Cart Slider -->
  <CartSlide v-model="cartOpen" />
</template>

<style scoped></style>
