<script setup>
import PageHeader from '@/components/Reusables/PageHeader.vue';


</script>

<template>
    <div>
        <PageHeader>
            <template #path>Home</template>
            <template #page>Account</template>
        </PageHeader>
        <RouterView />
    </div>
</template>



<style lang="scss" scoped>

</style>