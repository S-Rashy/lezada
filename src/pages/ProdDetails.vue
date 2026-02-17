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

  <main
    v-if="product"
    class="px-16 py-12 grid grid-cols-2 gap-16"
  >
    <section>
      <div class="bg-[#F5F5F5] p-10 relative">
        <img
          :src="product.image"
          class="mx-auto max-h-[520px] object-contain transition-all duration-300"
          :style="gallery[activeIndex]?.transform"
        />

        <Icon
          icon="mdi:fullscreen"
          width="22"
          class="absolute top-4 right-4 text-[#666]"
        />
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
      <h1 class="text-2xl font-medium text-[#222]">
        {{ product.id }}. {{ product.name }}
      </h1>

      <p class="text-sm text-[#D3122A]">
        Availability:
        <span class="font-medium">2 In Stock</span>
      </p>

      <p class="text-xl font-semibold">
        ${{ price.toFixed(2) }}
      </p>

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
        <div class="flex items-center border px-4 py-2 gap-6">
          <button @click="decrease">−</button>
          <span>{{ qty }}</span>
          <button @click="increase">+</button>
        </div>
      </div>

      <div class="flex gap-4">
        <MainButton
          @click="addToCart"
          class="bg-[#222] text-white px-10 py-3 text-sm"
        >
          ADD TO CART
        </MainButton>

        <button class="border p-3">
          <Icon icon="mdi:close" width="18" />
        </button>
      </div>

      <div class="flex items-center gap-2 text-sm">
        <input type="checkbox" v-model="agree" />
        <span>I agree with the terms and conditions</span>
      </div>

      <button class="w-full bg-[#F5E6A5] py-3 text-sm">
        BUY IT NOW
      </button>

      <div>
        <p class="text-sm mb-2">Guaranteed safe checkout</p>
        <div class="flex gap-3">
          <Icon icon="logos:visa" width="40" />
          <Icon icon="logos:mastercard" width="40" />
          <Icon icon="logos:maestro" width="40" />
          <Icon icon="logos:paypal" width="40" />
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
        <Icon icon="mdi:facebook" class="text-blue-600" />
        <Icon icon="mdi:twitter" class="text-sky-500" />
        <Icon icon="mdi:pinterest" class="text-red-600" />
      </div>
    </section>
  </main>

  <p v-else class="text-center py-20">
    Loading product…
  </p>
</template>

<style scoped>
button {
  transition: background 0.2s ease;
}
</style>
