<script setup>
import { useCartStore } from '@/stores/cart'
import PageHeader from '@/components/Reusables/PageHeader.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import MainButton from '@/components/Reusables/MainButton.vue'
import EmptyCart from './EmptyCart.vue'
import { toast } from 'vue-sonner'
import ClearCartModal from '@/Modals/ClearCartModal.vue'

const terms = ref(false)

const cartStore = useCartStore()
const cart = computed(() => cartStore.getCartItems)
const cartTotal = computed(() => cartStore.cartTotal)

onMounted(async () => {
  await cartStore.fetchCart()
})

const increaseQty = (item) => {
  cartStore.updateCart({ id: item.id, type: 'increment' })
}

const decreaseQty = (item) => {
  cartStore.updateCart({ id: item.id, type: 'decrement' })
}

const removeFromCart = (id) => {
  cartStore.removeFromCart(id)
}

const clearCart = () => {
  cartStore.clearCart()
}

const showModal = ref(false)

const closeModal = () => {
  showModal.value = false
}
const openModal = () => {
  showModal.value = true
}
</script>

<template>
  <div>
    <PageHeader>
      <template #path>Home</template>
      <template #page>Your Shopping Cart</template>
    </PageHeader>
  </div>

  <main v-if="cart.length > 0" class="px-12">
    <section class="pb-12 border-b border-gray-300">
      <table class="mx-auto my-8 w-[1100px]">
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
              <div class="flex gap-2 items-center">
                <div class="border-r h-25 w-25 flex items-center justify-center">
                  <img :src="item.image" alt="" class="max-w-full max-h-full object-contain" />
                </div>
                <span class="w-75 mx-auto text-[#33333]">{{ item.id }}. {{ item.name }}</span>
              </div>
            </td>
            <td>${{ item.price }}</td>
            <td>
              <div class="flex gap-5 items-center justify-center border-b border-[#777777]">
                <p
                  @click="decreaseQty({ id: item.id, type: 'decrement' })"
                  class="cursor-pointer hover:font-medium hover:scale-120"
                >
                  -
                </p>
                {{ item.quantity }}
                <p
                  @click="increaseQty({ id: item.id, type: 'increment' })"
                  class="cursor-pointer hover:font-medium hover:scale-120"
                >
                  +
                </p>
              </div>
            </td>
            <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <div
                class="border h-12 w-12 mx-auto flex items-center justify-center text-[#777777] hover:text-[#C61932] hover:border-2 group"
              >
                <Icon
                  icon="fluent-mdl2:cancel"
                  @click="removeFromCart(item.id)"
                  class="cursor-pointer group-hover:rotate-90 group-hover:scale-110 transition-all duration-200 ease-in-out"
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
        <RouterLink to="/shop">
          <MainButton>CONTINUE SHOPPING</MainButton>
        </RouterLink>
        <MainButton @click="openModal">CLEAR CART</MainButton>
      </div>
    </section>

    <section class="py-12 flex justify-between px-5">
      <div>
        <h3 class="text-[#333333] text-2xl">Pick a delivery date and Time</h3>
        <div class="flex flex-col gap-6 mt-8">
          <input
            type="date"
            v-model="date"
            class="w-60 border border-gray-300 px-3 py-2 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Write Delivery Time"
            class="w-60 border border-gray-300 px-3 py-2 focus:outline-none"
          />
          <p class="text-[#666666] w-140">
            Pick delivery date and time as you choose. Delivery Time takes place between 12PM - 4PM
            MON-FRI AND 8AM-11AM SAT.
          </p>
        </div>
      </div>

      <div class="bg-[#F5F5F5] py-8 min-w-[45%] flex flex-col items-center gap-8">
        <h3 class="text-[#333333] text-3xl">Cart Totals</h3>
        <table class="w-[80%]">
          <tr>
            <th>SUBTOTAL</th>
            <td>${{ cartTotal.toFixed(2) }}</td>
          </tr>
          <!-- <tr>
            <th>SHIPPING</th>
            <td>$10.00</td>
          </tr> -->
          <tr>
            <th>TOTAL</th>
            <td>${{ cartTotal.toFixed(2) }}</td>
          </tr>
        </table>

        <div>
          <input type="checkbox" id="terms" v-model="terms" class="mr-2" />
          <label for="terms" class="text-[#666666]">I agree with the terms and conditions</label>
        </div>

        <RouterLink to="/checkout">
          <MainButton
            :disabled="!terms"
            class="w-[300px] bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >PROCEED TO CHECKOUT</MainButton
          >
        </RouterLink>
      </div>
    </section>
    <ClearCartModal v-if="showModal" @close="closeModal" />
  </main>
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
td {
  margin: 0px auto;
  min-width: 120px;
}
</style>
