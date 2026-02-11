<script setup>
import MainButton from '@/components/Reusables/MainButton.vue'
import PageHeader from '@/components/Reusables/PageHeader.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

import LogoutModal from '@/Modals/LogoutModal.vue'
import { ref } from 'vue'

const showModal = ref(false)

const closeModal = () => {
  showModal.value = false
}
const openModal = () => {
  showModal.value = true
}
</script>

<template>
  <PageHeader>
    <template #path>Home</template>
    <template #page>Account</template>
  </PageHeader>
  <div class="p-10">
    account page
    <MainButton @click="openModal">Log out</MainButton>
  </div>
  <LogoutModal v-if="showModal" @close="closeModal" />
</template>
