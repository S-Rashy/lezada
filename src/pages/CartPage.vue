<script setup>
import { useCartStore } from '@/stores/cart'
import PageHeader from '@/components/Reusables/PageHeader.vue'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import MainButton from '@/components/Reusables/MainButton.vue'
import EmptyCart from './EmptyCart.vue'

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
    
    <section v-if="cart.length > 0">
      <table class="mx-auto my-8 w-[900px]">
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
              <div class="flex gap-2 items-center" >
                <div class="border-r h-25 w-25 flex items-center justify-center">
                  <img :src="item.image" alt="" class="max-w-full max-h-full object-contain" />
                </div>
                <span class="w-75 mx-auto text-[#33333]">{{ item.id }}. {{ item.name }}</span>
              </div>
            </td>
            <td>${{ item.price }}</td>
            <td>
              <div class="flex gap-5 items-center justify-center border-b border-[#777777]" >
                <p @click="decreaseQty(item.id)" class="cursor-pointer hover:font-medium hover:scale-120">-</p>
                {{ item.qty }}
                <p @click="increaseQty(item.id)" class="cursor-pointer hover:font-medium hover:scale-120">+</p>
              </div>
            </td>
            <td>${{ (item.price * item.qty).toFixed(2) }}</td>
            <td >
              <div class="border h-12 w-12 mx-auto flex items-center justify-center text-[#777777] hover:text-[#C61932]">
                <Icon
                  icon="fluent-mdl2:cancel"
                  @click="removeFromCart(item.id)"
                  class="cursor-pointer hover:rotate-90 hover:scale-110 transition-all duration-200 ease-in-out"
                  width="24"
                  height="24"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end gap-4">
        <MainButton>UPDATE CART</MainButton>
        <MainButton >CONTINUE SHOPPING</MainButton>
        <MainButton @click="clearCart">CLEAR CART</MainButton>
      </div>
  </section>
  <EmptyCart v-else />
</template>

<style scoped>
th {
  font-weight: 400;
}
th,
td {
  border: 1px solid;
  padding: 0px 10px;
  height: 100px;
  text-align: center;
}
td{
    margin: 0px auto;
    min-width: 100px;
}
</style>
