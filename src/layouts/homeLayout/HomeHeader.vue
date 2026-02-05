<script setup>
import CatalogDD from '@/components/headerComps/CatalogDD.vue'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const wishlistCount = computed(() => wishlistStore.wishlistCount)
const cartCount = computed(() => cartStore.cartCount)
</script>

<template>
  <main class="fixed bg-white w-full top-0 left-0 right-0 z-50 shadow-sm">
    <header class="px-8 py-6 flex justify-between">
      <a href="/" class="">
        <img
          src="https://lezada-demo.myshopify.com/cdn/shop/files/logo_300x300.png?v=1613746425"
          alt="Logo"
        />
      </a>
      <nav>
        <ul class="flex gap-10 font-[15px] text-[#777]">
          <li><a href="/" class="">Home</a></li>
          <li><a href="/" class="">Shop</a></li>

          <div class="group relative inline-block">
            <li>
              <a href="/" class="flex items-center gap-[2px]"
                >Catalog <Icon icon="ep:arrow-down" width="16" height="16"
              /></a>
              <CatalogDD/>
            </li>
          </div>
          <li>
            <a href="/" class="flex items-center gap-[2px]"
              >Blog <Icon icon="ep:arrow-down" width="16" height="16"
            /></a>
          </li>
          <li>
            <a href="/" class="flex items-center gap-[2px]"
              >Pages <Icon icon="ep:arrow-down" width="16" height="16"
            /></a>
          </li>
        </ul>
      </nav>
      <div class="flex gap-10">
        <Icon icon="tdesign:search" width="24" height="24" />

        <RouterLink to="/account">
          <Icon icon="ri:user-fill" width="24" height="24" />
        </RouterLink>

        <RouterLink to="/wishlist" class="relative">
          <p
            class="text-white bg-[#DB4444] rounded-full size-4 text-[12px] text-center absolute bottom-9 right-0 z-20"
            v-if="wishlistCount > 0"
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

        <RouterLink to="/cart" class="relative">
           <p
            class="text-white bg-[#DB4444] rounded-full size-4 text-[12px] text-center absolute bottom-9 left-3 z-20"
            v-if="cartCount > 0"
          >
            {{ cartCount }}
          </p>
          <Icon icon="vaadin:cart" width="24" height="24" />
        </RouterLink>
      </div>
    </header>
  </main>
</template>

<style lang="scss" scoped></style>
