<script setup>
import { computed } from 'vue'
import MainButton from '@/components/Reusables/MainButton.vue'
import PageHeader from '@/components/Reusables/PageHeader.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import LogoutModal from '@/Modals/LogoutModal.vue'
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'

const authStore = useAuthStore()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const user = authStore.getUser
const router = useRouter()

const order = computed(() => orderStore.currentOrder)

const shippingAddress = computed(() => cartStore.shippingAddress)
const billingAddress = computed(() => cartStore.billingAddress)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const showModal = ref(false)

const closeModal = () => {
  showModal.value = false
}
const openModal = () => {
  showModal.value = true
}

const route = useRouter()
const orderId = orderStore.currentOrder?.id
if (orderId) {
  orderStore.fetchOrder(orderId)
}
</script>

<template>
  <PageHeader>
    <template #path>Home</template>
    <template #page>Account</template>
  </PageHeader>
  <div class="p-10">
    <div>
      <h3>Shipping Address</h3>
      <p>{{ shippingAddress }}</p>
      <div v-if="shippingAddress">
        <p>{{ shippingAddress.address }}</p>
        <p>{{ shippingAddress.city }}, {{ shippingAddress.country }}</p>
        <p>{{ shippingAddress.postalCode }}</p>
      </div>

      <h3>Billing Address</h3>
      <p>{{ billingAddress }}</p>
    </div>

    <!-- <div v-if="order">
    <p><strong>Order ID:</strong> {{ order.id }}</p>
    <p><strong>Shipping:</strong> {{ order.shipping_address }}</p>
    <p><strong>Billing:</strong> {{ order.billing_address }}</p>
    <p><strong>Total:</strong> ${{ order.total }}</p>
  </div> -->

    <div v-if="orderStore.isLoading">Loading...</div>
    <div v-else>
      <!-- <h2>Order ID: {{ orderStore.currentOrder.id }}</h2>
    <p>Total: {{ orderStore.currentOrder.total }}</p> -->
    </div>
    account page
    <MainButton @click="openModal">Log out</MainButton>
  </div>
  <LogoutModal v-if="showModal" @close="closeModal" />
</template>
