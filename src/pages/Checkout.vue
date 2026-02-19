<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import ConfirmedModal from '@/Modals/ConfirmedModal.vue'
import MainButton from '@/components/Reusables/MainButton.vue'
import { useOrderStore } from '@/stores/order'
import { useCurrency } from '@/helpers/useCurrency'
const { format } = useCurrency()

const cartStore = useCartStore()
const authStore = useAuthStore()
const orderStore = useOrderStore()
const user = computed(() => authStore.getUser)
const useShippingAsBilling = ref(true)
const isLoading = ref(false)
const showConfirmation = ref(false)

const cartItems = computed(() => cartStore.getCartItems)
const cartTotal = computed(() => cartStore.cartTotal)
const cartCount = computed(() => cartStore.cartCount)

const userInitial = computed(() => {
  const user = authStore.user
  if (!user) return '?'

  if (user.name) return user.name.charAt(0).toUpperCase()
  if (user.email) return user.email.charAt(0).toUpperCase()

  return '?'
})

const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  country: '',
  postalCode: '',
  paymentMethod: 'card',
})
watch(
  () => authStore.user,
  (user) => {
    if (user) {
      form.email = user.email
      //   form.firstName = user.first_name || ''
      //   form.lastName = user.last_name || ''
    }
  },
  { immediate: true },
)
const shippingRates = {
  Nigeria: 20,
  Ghana: 25,
  Kenya: 30,
  Rwanda: 29,
  Togo: 28,
}
const shippingPrice = computed(() => {
  return shippingRates[form.country] || 0
})

const formatAddress = (addr) => {
  return `${addr.address}${addr.apartment ? ', ' + addr.apartment : ''}, ${addr.city}, ${addr.country} ${addr.postalCode}`
}

const showSuccessModal = ref(false)

const submitCheckout = async () => {
  try {
    isLoading.value = true

    const shippingAddressObj = {
      address: form.address,
      apartment: form.apartment,
      city: form.city,
      country: form.country,
      postalCode: form.postalCode,
    }

    const shippingAddress = formatAddress(shippingAddressObj)

    const billingAddress = useShippingAsBilling.value
      ? shippingAddress
      : formatAddress(shippingAddressObj)

    await cartStore.checkout({
      payment_method: form.paymentMethod,
      shipping_address: shippingAddress,
      billing_address: billingAddress,
    })

    showSuccessModal.value = true
  } catch (error) {
    console.error(error)
    alert('Checkout failed')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen py-10 mt-22">
    <div class="mx-auto max-w-6xl px-4 lg:grid lg:grid-cols-2 lg:gap-12">
      <!-- LEFT: FORM -->
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <!-- Contact -->

        <div class="flex gap-2 items-center mb-3 border-b border-gray-300 pb-3">
          <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            {{ userInitial }}
          </div>
          <p>{{ user.email }}</p>
        </div>

        <!-- Delivery -->
        <h2 class="text-lg font-semibold mt-8 mb-4">Delivery</h2>

        <div>
          <select v-model="form.country" class="input mb-3">
            <option value="">Country/Region</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Togo">Togo</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Kenya">Kenya</option>
            <option value="Ghana">Ghana</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <input
            placeholder="First name (optional)"
            :value="user?.name?.split(' ')[0] || ''"
            class="input"
          />
          <input
            placeholder="Last name (optional)"
            :value="user?.name?.split(' ').slice(1).join(' ') || ''"
            class="input"
          />
        </div>

        <input v-model="form.address" placeholder="Address" class="input mt-3" />

        <input
          v-model="form.apartment"
          placeholder="Apartment, suite, etc. (optional)"
          class="input mt-3"
        />

        <div class="grid grid-cols-2 gap-3 mt-3">
          <input v-model="form.city" placeholder="City" class="input" />
          <input v-model="form.postalCode" placeholder="Postal code" class="input" />
        </div>

        <!-- Shipping -->
        <h2 class="text-lg font-semibold mt-8 mb-4">Shipping method</h2>
        <div class="flex justify-between items-center border rounded-md px-4 py-3 text-sm">
          <span>International Shipping</span>
          <span class="font-medium">${{ shippingPrice.toFixed(2) }}</span>
        </div>

        <!-- PAYMENT -->
        <section>
          <h2 class="text-lg font-semibold mb-1">Payment</h2>
          <p class="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>

          <!-- Credit Card Box -->
          <div class="border rounded-lg overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between px-4 py-3 border-b">
              <label class="flex items-center gap-2 text-sm font-medium">
                <input type="radio" checked class="accent-black" />
                Credit card
              </label>

              <!-- Optional card brand icon -->
              <div
                class="h-6 w-6 rounded bg-orange-400 text-white text-xs flex items-center justify-center"
              >
                B
              </div>
            </div>

            <!-- Card fields -->
            <div class="p-4 space-y-3 bg-gray-50">
              <input v-model="form.cardNumber" placeholder="Card number" class="input" />

              <div class="grid grid-cols-2 gap-3">
                <input
                  v-model="form.cardExpiration"
                  placeholder="Expiration date (MM / YY)"
                  class="input"
                />
                <input v-model="form.cardSecurityCode" placeholder="Security code" class="input" />
              </div>

              <input v-model="form.cardNumber" placeholder="Name on card" class="input" />

              <!-- Checkbox -->
              <label class="flex items-center gap-2 text-sm mt-2">
                <input type="checkbox" v-model="useShippingAsBilling" class="accent-black" />
                Use shipping address as billing address
              </label>
            </div>
          </div>

          <!-- BILLING ADDRESS (collapsible) -->
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[1000px]"
            leave-from-class="opacity-100 max-h-[1000px]"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="!useShippingAsBilling" class="mt-6 space-y-3 overflow-hidden">
              <h3 class="text-sm font-semibold">Billing address</h3>

              <select class="input">
                <option>Saved addresses</option>
                <option>Albania</option>
              </select>

              <select class="input">
                <option>Country / Region</option>
                <option>Albania</option>
              </select>

              <div class="grid grid-cols-2 gap-3">
                <input class="input" placeholder="First name (optional)" />
                <input class="input" placeholder="Last name" />
              </div>

              <input class="input" placeholder="Address" />
              <input class="input" placeholder="Apartment, suite, etc. (optional)" />

              <div class="grid grid-cols-2 gap-3">
                <input class="input" placeholder="City" />
                <input class="input" placeholder="Postal code (optional)" />
              </div>
            </div>
          </transition>
        </section>

        <!-- Submit -->
        <MainButton
          @click="submitCheckout"
          :disabled="isLoading || cartCount === 0"
          class="mt-8 w-full rounded-md py-4 font-medium"
        >
          {{ isLoading ? 'Processing…' : 'Pay now' }}
        </MainButton>
      </div>

      <!-- RIGHT: SUMMARY -->
      <div class="lg:mt-0 bg-gray-50">
        <!-- <div class="rounded-lg p-6 shadow-sm sticky top-10"> -->
        <div class="w-120 p-4">
          <!-- Scrollable cart items -->
          <div class="max-h-54 overflow-y-auto space-y-4">
            <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between">
              <!-- Item image -->
              <div class="relative">
                <img
                  :src="item.image"
                  alt="item.title"
                  class="w-14 h-14 object-cover rounded-md border-3 border-white shadow-lg"
                />
                <span
                  class="absolute top-0 right-0 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-md"
                >
                  {{ item.quantity }}
                </span>
              </div>
              <!-- Item title -->
              <div class="flex-1 ml-3 text-sm">
                {{ item.name }}
              </div>
              <!-- Item price -->
              <div class="text-sm font-semibold">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </div>
            </div>
            <!-- Scroll hint -->
            <!-- <div v-if="cartItems.length > 3" class="text-center text-gray-500 text-xs py-2">
              Scroll for more items ↓
            </div> -->
          </div>

          <!-- Divider -->
          <div class="mt-4 pt-4 space-y-4 text-sm">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <!-- <span>{{ cartCount }} items</span> -->
              <span>${{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>${{ shippingPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>USD ${{ (cartTotal + shippingPrice).toFixed(2) }}</span>
            </div>
          </div>
        </div>
        <!-- Items -->
        <!-- <div
            v-for="item in cartStore.cart"
            :key="item.id"
            class="flex items-center gap-4 border-b pb-4 mb-4"
          >
            <img :src="item.image" class="h-16 w-16 rounded-md border object-cover" />
            <div class="flex-1">
              <p class="text-sm font-medium">{{ item.name }}</p>
              <p class="text-xs text-gray-500">${{ item.price }} × {{ item.qty }}</p>
            </div>
            <p class="text-sm font-medium">${{ item.price * item.qty }}</p>
          </div> -->

        <!-- Totals -->
        <!-- <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">Subtotal</span>
              <span>${{ cartStore.subtotal }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-500">Shipping</span>
              <span>${{ cartStore.shipping }}</span>
            </div>

            <div class="flex justify-between font-semibold text-base pt-4 border-t">
              <span>Total</span>
              <span>${{ cartStore.total }}</span>
            </div>
          </div> -->
      </div>
      <ConfirmedModal :show="showSuccessModal" @close="showSuccessModal = false" />
    </div>
  </div>
  <!-- </div> -->
</template>

<style scoped>
.input {
  width: 100%;
  border-radius: 6px;
  border: 1px solid rgb(229, 231, 235);
  padding: 12px;
  font-size: 14px;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}

.input:focus {
  border-color: black;
  box-shadow: 0 0 0 2px black;
}
</style>
