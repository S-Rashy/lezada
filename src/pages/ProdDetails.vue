<script setup>
import PageHeader from '@/components/Reusables/PageHeader.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import api from '@/helpers/axios'
import { useCartStore } from '@/stores/cart'
import MainButton from '@/components/Reusables/MainButton.vue'

const route = useRoute()
const cartStore = useCartStore()

const product = ref(null)
const qty = ref(1)
const agree = ref(false)
const activeIndex = ref(0)

const productId = Number(route.params.id)

onMounted(async () => {
  try {
    const res = await api.get(`/products/${productId}`)
    product.value = res.data.data
  } catch (err) {
    console.error('Error fetching product', err)
  }
})

const price = computed(() => Number(product.value?.price || 0))

const addToCart = () => {
  cartStore.addToCart({
    product_id: productId,
    quantity: qty.value,
  })
}

const increase = () => qty.value++
const decrease = () => qty.value > 1 && qty.value--

const gallery = computed(() => {
  if (!product.value) return []
  return [
    { transform: 'scale(1)' },
    { transform: 'scale(0.95) translateX(4px)' },
    { transform: 'scale(0.9) translateY(6px)' },
  ]
})
</script>

<template>
  <PageHeader class="mt-28">
    <template #path>Home</template>
    <template #page>{{ product?.name || 'Product Details' }}</template>
  </PageHeader>

  <main v-if="product" class="px-16 py-12 grid grid-cols-2 gap-16">
    <section>
      <div class="bg-[#F5F5F5] p-10 relative">
        <img
          :src="product.image"
          class="mx-auto max-h-[520px] object-contain transition-all duration-300"
          :style="gallery[activeIndex]?.transform"
        />

        <Icon icon="mdi:fullscreen" width="22" class="absolute top-4 right-4 text-[#666]" />
      </div>

      <div class="flex gap-4 mt-6">
        <div
          v-for="(_, i) in gallery"
          :key="i"
          @click="activeIndex = i"
          class="border w-20 h-20 flex items-center justify-center cursor-pointer hover:border-black"
        >
          <img
            :src="product.image"
            class="max-h-full object-contain"
            :style="gallery[i].transform"
          />
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h1 class="text-2xl font-medium text-[#222]">{{ product.id }}. {{ product.name }}</h1>

      <p class="text-sm text-[#D3122A]">
        Availability:
        <span class="font-medium">2 In Stock</span>
      </p>

      <p class="text-xl font-semibold">${{ price.toFixed(2) }}</p>

      <div class="flex items-center gap-6 text-sm text-[#555]">
        <span class="flex items-center gap-1">
          <Icon icon="mdi:truck-outline" />
          Shipping
        </span>
        <span class="flex items-center gap-1">
          <Icon icon="mdi:email-outline" />
          Ask About This Product
        </span>
      </div>

      <div class="flex items-center gap-4">
        <span>Quantity:</span>
        <div class="flex gap-8 items-center justify-center border-b-2 border-[#777777]">
          <button @click="decrease" class="cursor-pointer hover:font-semibold hover:scale-120">−</button>
          <span>{{ qty }}</span>
          <button @click="increase" class="cursor-pointer hover:font-semibold hover:scale-120">+</button>
        </div>
      </div>

      <div class="flex gap-4">
        <MainButton @click="addToCart" class="bg-[#222] text-white px-10 py-3 text-sm">
          ADD TO CART
        </MainButton>

        <button class="border p-3 h-12 hover:bg-[#333333] cursor-pointer hover:text-white bg-transparent text-black hover:font-semibold transition-colors duration-300 ease-in-out">
          <Icon icon="mdi:close" width="18" />
        </button>
      </div>

      <div class="flex items-center gap-2 text-sm">
        <input type="checkbox" v-model="agree" />
        <span>I agree with the terms and conditions</span>
      </div>

      <button class="w-full bg-[#F5E6A5] py-3 text-sm">BUY IT NOW</button>

      <div>
        <p class="text-sm mb-2">Guaranteed safe checkout</p>
        <div class="flex gap-3 items-center">
          <Icon icon="logos:visa" width="40" />
          <Icon icon="logos:mastercard" width="40" />
          <Icon icon="logos:maestro" width="40" />
          <Icon icon="logos:paypal" width="40" height="40" />
        </div>
      </div>

      <hr />

      <div class="space-y-2 text-sm text-[#555]">
        <p><strong>SKU:</strong> {{ product.sku || '1415' }}</p>
        <p><strong>Vendor:</strong> Vendor {{ product.id }}</p>
        <p><strong>Type:</strong> Type {{ product.id }}</p>
      </div>

      <div class="flex items-center gap-4">
        <span>Share:</span>
        <Icon icon="mdi:facebook" width="45" class=" cursor-pointer text-blue-600 hover:text-blue-800" />
        <Icon icon="mdi:twitter" width="45" class=" cursor-pointer text-sky-500 hover:text-sky-700" />
        <Icon icon="mdi:pinterest" width="45" class=" cursor-pointer text-red-600 hover:text-red-800" />
      </div>
    </section>

    <section class="col-span-2">
        <h2 class="text-2xl font-medium text-[#222] mb-6 mx-auto max-w-3xl text-center">Description</h2>
        <p class=" text-[#555] leading-7">
            {{ product.description }}
        </p>
    </section>
  </main>

  <p v-else class="text-center py-20">Loading product…</p>
</template>

<style scoped>
button {
  transition: background 0.2s ease;
}
</style>
