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
</script>

<template>
  <main class="fixed bg-white w-full top-0 left-0 right-0 z-50 shadow-sm">
    <header class="px-8 py-6 flex justify-between">
      <a href="/">
        <img
          src="https://lezada-demo.myshopify.com/cdn/shop/files/logo_300x300.png?v=1613746425"
          alt="Logo"
        />
      </a>
      <nav>
        <ul class="flex gap-10 font-[15px] text-[#777]">
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>

          <div class="group relative inline-block">
            <li>
              <a href="/" class="flex items-center gap-[2px]">
                Catalog <Icon icon="ep:arrow-down" width="16" height="16" />
              </a>
              <CatalogDD />
            </li>
          </div>

          <li><a href="/about">About Us</a></li>
          <li><a href="/">Contact us</a></li>
        </ul>
      </nav>

      <div class="flex gap-10 items-center">
        <Icon icon="tdesign:search" width="24" height="24" class="cursor-pointer" />

        <RouterLink to="/account">
          <Icon icon="ri:user-fill" width="24" height="24" />
        </RouterLink>

        <RouterLink to="/wishlist" class="relative">
          <p
            v-if="wishlistCount > 0"
            class="text-white bg-[#DB4444] rounded-full size-4 text-[12px] text-center absolute bottom-4 right-0 z-20"
          >
            {{ wishlistCount }}
          </p>
          <Icon
            icon="solar:heart-outline"
            width="24"
            height="24"
            class="relative z-10 hover:scale-120 font-semibold transition-all duration-200 ease-in"
          />
        </RouterLink>

        <!-- Cart button — opens slider -->
        <button @click="cartOpen = true" class="relative cursor-pointer">
          <p
            v-if="cartCount > 0"
            class="text-white bg-[#DB4444] rounded-full size-4 text-[12px] text-center absolute bottom-4 left-3 z-20"
          >
            {{ cartCount }}
          </p>
          <Icon icon="vaadin:cart" width="24" height="24" />
        </button>
      </div>
    </header>
  </main>

  <!-- Cart Slider -->
  <CartSlide v-model="cartOpen" />
</template>

<style lang="scss" scoped></style>