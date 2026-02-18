<script setup>
import { defineProps, defineEmits } from 'vue'
import MainButton from '@/components/Reusables/MainButton.vue'
import  { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const props = defineProps({
  show: { type: Boolean, required: true },
})

const emit = defineEmits(['close'])
const closeModal = () => {
  emit('close')
    router.push('/')
    cartStore.clearCart()
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div class="bg-white rounded-xl shadow-lg p-6 w-120 flex flex-col items-center">
        <!-- Success Animation -->
        <div class="w-16 h-16 mb-4">
          <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark-check" fill="none" d="M14 27l7 7 16-16"/>
          </svg>
        </div>

        <h2 class="text-2xl font-bold mb-2 text-gray-800">Order Completed!</h2>
        <p class="text-center text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully processed.
            You will receive a confirmation email shortly.
        </p>

        <MainButton
          @click="closeModal"
          class="px-6 py-2 rounded"
        >
          Close
        </MainButton>
      </div>
    </div>
  </transition>
</template>

<style>
/* Fade animation for modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Checkmark animation - gray theme */
.checkmark {
  stroke-width: 2;
  stroke: #4b5563; /* gray-600 */
  stroke-miterlimit: 10;
  animation: scaleIn 0.3s ease forwards;
}
.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke: #4b5563;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.4s 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

/* Keyframes */
@keyframes stroke {
  100% { stroke-dashoffset: 0; }
}
@keyframes scaleIn {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
</style>
