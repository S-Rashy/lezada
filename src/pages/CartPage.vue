<script setup>
import { useCartStore } from '@/stores/cart'
import PageHeader from '@/components/Reusables/PageHeader.vue'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)
const cartTotal = computed(() => cartStore.cartTotal)

const increaseQty = (id) => {
  cartStore.increaseQty(id)
}

const decreaseQty = (id) => {
  cartStore.decreaseQty(id)
}

const removeFromCart = (id) => {
  cartStore.removeFromCart(id)
}

const clearCart = () => {
  cartStore.clearCart()
}
</script>

<template>
  <div>
    <PageHeader>
      <template #path>Home</template>
      <template #page>Your Shopping Cart</template>
    </PageHeader>
  </div>

  <table class="mx-auto">
    <thead>
      <tr class="uppercase">
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in cart" :key="item.id">
        <td>
          <div class="flex gap-2">
            <div class="border-r h-22 w-20 flex items-center justify-center">
              <img :src="item.image" alt="" class="w-10 object-contain border" />
            </div>
            <span>{{ item.id }}. {{ item.title }}</span>
          </div>
        </td>
        <td>${{ item.price.toFixed(2) }}</td>
        <td>
          <div class="flex gap-3">
            <p @click="decreaseQty(item.id)">-</p>
            {{ item.qty }}
            <p @click="increaseQty(item.id)">+</p>
          </div>
        </td>
        <td>${{ (item.price * item.qty).toFixed(2) }}</td>
        <td>
          <div class="border h-12 w-12 flex items-center justify-center">
            <Icon
              icon="fluent-mdl2:cancel"
              @click="removeFromCart(item.id)"
              class="cursor-pointer hover:text-red-500"
              width="24"
              height="24"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th {
  font-weight: 400;
}
th,
td {
  border: 1px solid;
  padding: 0px 10px;
  height: 90px;
}
</style>
