<script setup>
import MainButton from "@/components/Reusables/MainButton.vue";
import Modal from "@/components/Reusables/Modal.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};
const logout = () => {
  authStore.logout();
  closeModal();
    router.push({ name: "HomePage" });
}

</script>

<template>
  <Modal>
    <template #info> Are you sure you want to log out?</template>

    <template #button>
      <div class="flex justify-between gap-8 items-center">
        <button     class="w-50 h-12 hover:bg-[#333333] cursor-pointer hover:text-white bg-transparent text-black border-1 transition-colors duration-300 ease-in-out" @click="closeModal"> No, Cancel</button>
        <MainButton  @click="logout">
          Yes, Log out
        </MainButton>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped></style>
