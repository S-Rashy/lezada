<script setup>
import MainButton from "@/components/Reusables/MainButton.vue";
import Modal from "@/components/Reusables/Modal.vue";
import { useCartStore } from "@/stores/cart";
const router = useRouter();

const cartStore = useCartStore();
const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};
const clearCart = () => {
  cartStore.clearCart()
  closeModal()
  router.push('/')
}


</script>

<template>
  <Modal>
    <template #info> Are you sure you want to clear your cart items?</template>

    <template #button>
      <div class="flex justify-between gap-8 items-center">
        <button class="w-50 h-12 hover:bg-[#333333] cursor-pointer hover:text-white bg-transparent text-black border-1 transition-colors duration-300 ease-in-out" @click="closeModal"> No, Cancel</button>
        <MainButton  @click="clearCart">
          Yes, Clear Cart
        </MainButton>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped></style>
