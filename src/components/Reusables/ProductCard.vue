<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useWishlistStore } from '../../stores/wishlist'
import { useCartStore } from '@/stores/cart'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import { useCurrency } from '@/helpers/useCurrency'
const router = useRouter()
const { format } = useCurrency()

const goToProduct = () => {
  router.push(`/product/${props.product.id}`)
}

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
const price = computed(() => Number(props.product.price))

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))
const toggleWishlist = () => {
  toast(
    isInWishlist.value
      ? `${props.product.name} removed from wishlist`
      : `${props.product.name} added to wishlist`,
  )
  wishlistStore.toggleWishlist(props.product)
}
const addToCart = () => {
  toast.success(`${props.product.name} added to cart `)
  cartStore.addToCart({ product_id: props.product.id, quantity: 1 })
}
</script>

<template>
  <main class="group space-y-5">
    <div
      @click="goToProduct"
      class="h-[450px] w-[350px] bg-[#F5F5F5] rounded-[4px] pt-4 flex flex-col justify-between relative overflow-hidden group"
    >
      <div class="absolute inset-0 flex justify-center items-center p-4">
        <img :src="product.image" alt="" class="max-h-full max-w-full object-contain" />
      </div>

      <aside class="flex justify-between px-4 relative z-10">
        <div class="flex flex-col gap-2 text-white text-sm">
          <!-- <p class="bg-[#98d8ca] p-2 rounded-full size-15 flex items-center justify-center">SALE</p> -->
          <!-- <p class="bg-[#98d8ca] p-2 rounded-full size-15 flex items-center justify-center">
            - 15%
          </p> -->
        </div>

        <div
          class="flex flex-col gap-3 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div
            @click.stop="toggleWishlist"
            :class="['tooltip cursor-pointer bg-white text-[#777] size-10 p-2']"
          >
            <Icon
              :icon="isInWishlist ? 'iconoir:cancel' : 'solar:heart-outline'"
              width="24"
              height="24"
            />
            <span class="tooltiptext">
              {{ isInWishlist ? 'Remove from wishlist' : 'Add to wishlist' }}
            </span>
          </div>

          <div
            class="tooltip cursor-pointer bg-white text-[#777] size-10 p-2 flex items-center justify-center"
          >
            <Icon icon="ph:shuffle-light" width="24" height="24" />
            <span class="tooltiptext">Compare</span>
          </div>

          <div
            class="tooltip cursor-pointer bg-white text-[#777] size-10 p-2 flex items-center justify-center"
          >
            <Icon icon="tdesign:search" width="24" height="24" />
            <span class="tooltiptext">Quick view</span>
          </div>
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
        {{ format(price * 0.85) }}
        <span class="line-through text-[#777] 2"> ${{ format(price) }} </span>
      </p>
    </div>
  </main>
</template>
<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: rgb(40, 39, 39);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -5px;
  right: 110%;
  font-size: 12px;
}

.tooltiptext::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent rgb(40, 39, 39);
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
