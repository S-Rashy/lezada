<script setup>
import { useCartStore } from '@/stores/cart'
import PageHeader from '@/components/Reusables/PageHeader.vue'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)
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
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in cart" :key="index">
        <td>
          <div class="flex gap-2">
            <img :src="item.image" alt="" class="w-10 object-contain border-r" />
            {{ item.id }}. {{ item.title }}
          </div>
        </td>
        <td>{{ item.price }}</td>
        <td>
          <div class="flex gap-3">
              <p>-</p>
              {{ item.qty }}
              <p>+</p>
          </div>
        </td>
        <td>{{ item.price * item.qty }}</td>
        <td><Icon icon="fluent-mdl2:cancel" width="24" height="24" /></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th,
td {
  border: 1px solid;
  padding: 0px 10px;
  height: 90px;
}
</style>
