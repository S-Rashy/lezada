<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useCartStore } from '@/stores/cart'
import MainButton from '@/components/Reusables/MainButton.vue'

// Props & emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'checkout', 'view-cart'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const agreedToTerms = ref(false)

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.getCartItems)
const cartTotal = computed(() => cartStore.cartTotal)
const totalQuantity = computed(() => cartStore.cartCount)

function closeCart() {
  isOpen.value = false
}

function removeItem(id) {
  cartStore.removeItem(id)
}

function increaseQty(id) {
  cartStore.increaseQty(id)
}

function decreaseQty(id) {
  cartStore.decreaseQty(id)
}

function checkout() {
  if (!agreedToTerms.value || !cartItems.value.length) return
  emit('checkout', cartItems.value)
}

function viewCart() {
  emit('view-cart')
  closeCart()
}
</script>

<template>
  <!-- Overlay -->
  <Transition name="overlay">
    <div v-if="isOpen" class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" @click="closeCart" />
  </Transition>

  <!-- Cart Drawer -->
  <Transition name="drawer">
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <h2 class="text-2xl tracking-tight text-stone-900">Cart</h2>
        </div>

        <button
          @click="closeCart"
          class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 hover:rotate-90 hover:scale-125 cursor-pointer transition-all duration-200 ease-in-out"
        >
          <Icon icon="hugeicons:cancel-01" class="w-6 h-6" />
        </button>
      </div>

      <!-- Items -->
      <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <TransitionGroup name="item">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex gap-4 py-4 border-b border-stone-100 last:border-0"
          >
            <div class="w-20 h-20 bg-stone-50 rounded-lg overflow-hidden flex-shrink-0">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start gap-2">
                <p class="text-sm text-stone-800 leading-snug">{{ item.id }}. {{ item.name }}</p>
                <button
                  @click="removeItem(item.id)"
                  class="flex-shrink-0 text-stone-300 hover:text-rose-400 transition-colors mt-0.5"
                >
                  <Icon icon="hugeicons:cancel-01" class="w-4 h-4" />
                </button>
              </div>
              <p v-if="item.variant" class="text-xs text-stone-400 mt-0.5">{{ item.variant }}</p>
              <div class="flex items-center justify-between mt-3">
                <div class="flex items-center gap-1 overflow-hidden">
                  <p class="text-sm text-stone-800 text-center">
                    {{ item.quantity }} <span>x</span>
                  </p>

                  <p class="text-sm font-semibold text-stone-900">${{ item.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Empty state -->
        <div v-if="!cartItems" class="flex flex-col items-center justify-center py-20 text-center">
          <div class="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
            <Icon icon="hugeicons:shopping-bag-01" class="w-7 h-7 text-stone-400" />
          </div>
          <p class="text-stone-500 text-sm">Your cart is empty</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-stone-100 px-6 py-5 space-y-4 bg-white">
        <!-- Total -->
        <div class="flex justify-between items-center">
          <span class="font-semibold">Total:</span>
          <span class="text-lg font-semibold text-stone-900">${{ cartTotal.toFixed(2) }} USD</span>
        </div>

        <!-- Terms -->
        <label class="flex items-start gap-3 cursor-pointer group">
          <div
            class="mt-0.5 flex-shrink-0 w-4 h-4 border rounded transition-all flex items-center justify-center"
            :class="
              agreedToTerms
                ? 'bg-red-500 border-red-400'
                : 'bg-white border-stone-300 group-hover:border-red-300'
            "
            @click="agreedToTerms = !agreedToTerms"
          >
            <Icon v-if="agreedToTerms" icon="hugeicons:tick-01" class="w-3 h-3 text-white" />
          </div>
          <span class="text-xs text-stone-500 leading-relaxed">
            I agree with the
            <a href="#" class="underline hover:text-stone-800">terms and conditions</a>
          </span>
        </label>

        <!-- Checkout -->
        <RouterLink to="/checkout" >
            <button
              @click="checkout"
              :disabled="!agreedToTerms || !cartItems.length"
              class="w-full py-3.5 uppercase mb-5 transition-all"
              :class="
                agreedToTerms && cartItems.length
                  ? 'bg-red-400 hover:bg-red-500 text-white cursor-pointer'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              "
            >
              Checkout
            </button>
        </RouterLink>

        <!-- View Cart -->
        <RouterLink to="/cart">
            <MainButton @click="viewCart" class="w-full py-3.5 uppercase transition-colors">
              View Cart
            </MainButton>
        </RouterLink>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}
.drawer-enter-to,
.drawer-leave-from {
  transform: translateX(0);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.item-enter-active,
.item-leave-active {
  transition: all 0.25s ease;
}
.item-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.item-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
