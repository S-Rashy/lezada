<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useCartStore } from '@/stores/cart'

// Props & emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'checkout', 'view-cart'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const agreedToTerms = ref(false)

// Real cart store — expects: cartStore.items[], cartStore.removeItem(id),
// cartStore.increaseQty(id), cartStore.decreaseQty(id), cartStore.cartTotal
// Each item should have: { id, name, variant?, price, quantity, image }
const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
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
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      @click="closeCart"
    />
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
          <Icon icon="hugeicons:shopping-cart-01" class="w-5 h-5 text-stone-600" />
          <h2 class="text-xl font-semibold tracking-tight text-stone-900" style="font-family: 'Playfair Display', Georgia, serif;">
            Cart
          </h2>
          <span
            v-if="cartItems"
            class="bg-rose-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ totalQuantity }}
          </span>
        </div>
        <button
          @click="closeCart"
          class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
        >
          <Icon icon="hugeicons:cancel-01" class="w-5 h-5" />
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
                <p class="text-sm font-medium text-stone-800 leading-snug">{{ item.name }}</p>
                <button
                  @click="removeItem(item.id)"
                  class="flex-shrink-0 text-stone-300 hover:text-rose-400 transition-colors mt-0.5"
                >
                  <Icon icon="hugeicons:delete-02" class="w-4 h-4" />
                </button>
              </div>
              <p v-if="item.variant" class="text-xs text-stone-400 mt-0.5">{{ item.variant }}</p>
              <div class="flex items-center justify-between mt-3">
                <!-- Qty controls -->
                <div class="flex items-center gap-1 border border-stone-200 rounded-lg overflow-hidden">
                  <button
                    @click="decreaseQty(item.id)"
                    class="px-2 py-1.5 text-stone-500 hover:bg-stone-100 transition-colors flex items-center"
                  >
                    <Icon icon="hugeicons:minus-sign" class="w-3.5 h-3.5" />
                  </button>
                  <span class="text-sm font-semibold text-stone-800 w-6 text-center">{{ item.quantity }}</span>
                  <button
                    @click="increaseQty(item.id)"
                    class="px-2 py-1.5 text-stone-500 hover:bg-stone-100 transition-colors flex items-center"
                  >
                    <Icon icon="hugeicons:plus-sign" class="w-3.5 h-3.5" />
                  </button>
                </div>
                <p class="text-sm font-semibold text-stone-900">${{ (item.price * item.quantity).toFixed(2) }} USD</p>
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
          <span class="text-sm font-semibold text-stone-600 uppercase" style="letter-spacing: 0.08em;">Total</span>
          <span class="text-lg font-bold text-stone-900">${{ cartTotal.toFixed(2) }} USD</span>
        </div>

        <!-- Terms -->
        <label class="flex items-start gap-3 cursor-pointer group">
          <div
            class="mt-0.5 flex-shrink-0 w-4 h-4 border rounded transition-all flex items-center justify-center"
            :class="agreedToTerms
              ? 'bg-rose-400 border-rose-400'
              : 'bg-white border-stone-300 group-hover:border-rose-300'"
            @click="agreedToTerms = !agreedToTerms"
          >
            <Icon v-if="agreedToTerms" icon="hugeicons:tick-01" class="w-3 h-3 text-white" />
          </div>
          <span class="text-xs text-stone-500 leading-relaxed">
            I agree with the <a href="#" class="underline hover:text-stone-800">terms and conditions</a>
          </span>
        </label>

        <!-- Checkout -->
        <button
          @click="checkout"
          :disabled="!agreedToTerms || !cartItems.length"
          class="w-full py-3.5 text-sm font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2"
          :class="agreedToTerms && cartItems.length
            ? 'bg-rose-400 hover:bg-rose-500 text-white cursor-pointer'
            : 'bg-stone-200 text-stone-400 cursor-not-allowed'"
        >
          <Icon icon="hugeicons:credit-card" class="w-4 h-4" />
          Checkout
        </button>

        <!-- View Cart -->
        <button
          @click="viewCart"
          class="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
        >
          <Icon icon="hugeicons:shopping-bag-check" class="w-4 h-4" />
          View Cart
        </button>
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