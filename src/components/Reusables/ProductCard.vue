<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useWishlistStore } from '../../stores/wishlist'
import { useCartStore } from '@/stores/cart'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const isInWishlist = computed(() =>
  wishlistStore.isInWishlist(props.product.id)
)
const toggleWishlist = (product) => {
  wishlistStore.toggleWishlist(product)

}
const addToCart = () => {
  cartStore.addToCart(props.product)
}
</script>

<template>
  <main class="group space-y-5">
    <div
      class="h-[450px] w-[350px] bg-[#F5F5F5] rounded-[4px] pt-4 flex flex-col justify-between relative overflow-hidden group"
    >
      <div class="absolute inset-0 flex justify-center items-center p-4">
        <img :src="product.image" alt="" class="max-h-full max-w-full object-contain" />
      </div>

      <aside class="flex justify-between px-4 relative z-10">
        <div class="flex flex-col gap-2 text-white text-sm">
          <p class="bg-[#98d8ca] p-2 rounded-full size-15 flex items-center justify-center">SALE</p>
          <p class="bg-[#98d8ca] p-2 rounded-full size-15 flex items-center justify-center">
            - 15%
          </p>
        </div>

        <div
          class="flex flex-col gap-3 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div
            @click="toggleWishlist(product)"
            :class="[
              'cursor-pointer bg-white text-[#777] size-10 p-2',
            ]"
          >
            <Icon 
            :icon="isInWishlist ? 'iconoir:cancel' : 'solar:heart-outline'"
             width="24" height="24" />
          </div>
          <Icon
            icon="ph:shuffle-light"
            width="24"
            height="24"
            class="cursor-pointer bg-white text-[#777] size-10 p-2"
          />
          <Icon
            icon="tdesign:search"
            width="24"
            height="24"
            class="cursor-pointer bg-white text-[#777] size-10 p-2"
          />
        </div>
      </aside>
    </div>

    <div class="my-4 flex flex-col gap-4 text-[#333333]">
      <h4
        class="w-[300px] truncate cursor-pointer group-hover:-translate-y-6 group-hover:opacity-0 transition-all duration-500"
      >
        {{ product.id }}. {{ product.name }}
      </h4>
      <button
      @click="addToCart"
        class="text-[#D3122A] absolute cursor-pointer translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
      >
        + Add to cart
      </button>

      <p class="font-semibold text-[#333333]">
        ${{ (product.price - product.price * 0.1) }}
        <span class="line-through text-[#777] 2"> ${{ product.price }} </span>
      </p>
    </div>
  </main>
</template>
<style lang="scss" scoped></style>
