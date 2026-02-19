<script setup>
import { onMounted, computed, ref } from 'vue'
import MainButton from '@/components/Reusables/MainButton.vue'
import PageHeader from '@/components/Reusables/PageHeader.vue'
import LogoutModal from '@/Modals/LogoutModal.vue'
import { useAuthStore } from '@/stores/auth'
import { useOrderStore } from '@/stores/order'
import { Icon } from '@iconify/vue'
import { useCartStore } from '@/stores/cart'

const authStore = useAuthStore()
const orderStore = useOrderStore()
const cartStore = useCartStore()
const user = authStore.getUser
const expandedOrders = ref([])

const shippingAddress = computed(() => cartStore.shippingAddress)
const billingAddress = computed(() => cartStore.billingAddress)

const showModal = ref(false)
const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

onMounted(async () => {
  await orderStore.fetchOrders()

  // Automatically mark orders as completed after delivery time
  orderStore.orders.forEach(o => {
    if (o.status === 'pending') startDeliveryTimer(o)
  })
})

const startDeliveryTimer = (order) => {
  // Option 1: 2 days delivery (realistic)
  // const deliveryMs = 2 * 24 * 60 * 60 * 1000

  // Option 2: 3 minutes delivery (testing)
  const deliveryMs = 3 * 60 * 1000

  setTimeout(() => {
    order.status = 'completed'
  }, deliveryMs)
}

const orders = computed(() => orderStore.orders)

const toggleOrder = (orderId) => {
  if (expandedOrders.value.includes(orderId)) {
    expandedOrders.value = expandedOrders.value.filter((id) => id !== orderId)
  } else {
    expandedOrders.value.push(orderId)
  }
}

const isExpanded = (orderId) => expandedOrders.value.includes(orderId)

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const estimatedDelivery = (dateStr) => {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + 3) // estimated delivery shown
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const statusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <PageHeader>
    <template #path>Home</template>
    <template #page>Account</template>
  </PageHeader>

  <main class="bg-[#f9f9f9] min-h-screen p-10">
    <div class="px-6 lg:px-10 max-w-5xl mx-auto space-y-8">
      <h2 class="text-4xl">My Account</h2>
      <!-- USER INFO + LOGOUT -->
      <div class="flex items-center justify-between p-6">
        <div class="flex items-center gap-6">
          <div
            class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold"
          >
            {{ user?.name?.charAt(0) || '?' }}
          </div>
          <div class="space-y-3">
            <p class="font-medium text-lg">{{ user?.name || user?.email }}</p>
            <p class="text-sm text-gray-500">{{ user?.email }}</p>
            <p class="text-sm text-gray-500">{{ user?.phone_number }}</p>

            <h3 class="font-semibold" v-if="shippingAddress">
              Shipping Address <span class="font-regular">{{ shippingAddress }}</span>
            </h3>
            <h3 class="font-semibold" v-if="billingAddress">
              Billing Address <span class="font-regular">{{ billingAddress }}</span>
            </h3>
          </div>
        </div>
        <MainButton @click="openModal">Log out</MainButton>
      </div>
      <!-- RECENT ORDERS -->
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="font-semibold text-lg mb-6">Recent Orders</h3>
        <div v-if="orderStore.isLoading" class="text-gray-500">Loading orders...</div>
        <div v-else-if="orders.length === 0" class="text-gray-400">No orders yet.</div>
        <div v-else class="space-y-4">
          <div class="space-y-6">
            <div v-for="o in orders" :key="o.id" class="rounded-lg p-4 shadow-md transition-shadow">
              <!-- Order Header -->
              <div
                class="flex justify-between items-center cursor-pointer"
                @click="toggleOrder(o.id)"
              >
                <div>
                  <p class="font-medium text-gray-900">Order #{{ o.id }}</p>
                  <p class="text-gray-500 text-sm">
                    Ordered: {{ formatDate(o.created_at) }} | Delivery:
                    {{ estimatedDelivery(o.created_at) }}
                  </p>
                  <span
                    :class="`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold ${statusColor(o.status)}`"
                  >
                    {{ o.status }}
                  </span>
                </div>
                <div class="flex items-center gap-4">
                  <p class="font-semibold text-gray-800">${{ o.total_amount }}</p>
                  <Icon
                    :class="{ 'rotate-180': isExpanded(o.id) }"
                    class="w-4 h-4 transform transition-transform"
                    icon="mdi:chevron-down"
                  />
                </div>
              </div>
              <!-- Expandable details -->
              <transition
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-200 ease-in"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-[1000px]"
                leave-from-class="opacity-100 max-h-[1000px]"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="isExpanded(o.id)" class="mt-4 text-sm text-gray-600 space-y-2">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p class="font-semibold">Shipping Address:</p>
                      <p>{{ o.shipping_address }}</p>
                    </div>
                    <div>
                      <p class="font-semibold">Billing Address:</p>
                      <p>{{ o.billing_address }}</p>
                    </div>
                  </div>
                  <!-- Items -->
                  <div class="space-y-2">
                    <p class="font-semibold mb-2">Items:</p>
                    <div
                      v-for="item in o.items"
                      :key="item.id"
                      class="flex items-center gap-4 border-b pb-2"
                    >
                      <img
                        :src="item.product.image"
                        alt=""
                        class="w-12 h-12 object-cover rounded-md"
                      />
                      <div class="flex-1">
                        <p>{{ item.product.name }}</p>
                        <p class="text-gray-500 text-sm">Quantity: {{ item.quantity }}</p>
                      </div>
                      <p class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <LogoutModal v-if="showModal" @close="closeModal" />
</template>

<style scoped>
/* Optional: subtle hover effect for order cards */
</style>
