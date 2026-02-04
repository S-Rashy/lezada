<script setup>
import MainButton from '@/components/Reusables/MainButton.vue';
import PageHeader from '@/components/Reusables/PageHeader.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter()

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

</script>

<template>
     <PageHeader>
            <template #path>Home</template>
            <template #page>Account</template>
        </PageHeader>
    <div class="py-10">
        account page
        <MainButton @click="handleLogout">Log out</MainButton>
    </div>
</template>