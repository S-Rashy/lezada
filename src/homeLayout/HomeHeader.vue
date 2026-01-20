<script setup>
import {Icon} from '@iconify/vue';
{/* <Icon icon="mdi:home" width="24" height="24" /> */}
</script>

<template>

   <main class="fixed bg-white w-full top-0 left-0 right-0 z-50 shadow-sm">
       <header class="p-8 flex justify-between ">
        <a href="/" class="">
            <img src="https://lezada-demo.myshopify.com/cdn/shop/files/logo_300x300.png?v=1613746425" alt="Logo">
        </a>
        <nav>
            <ul class="  flex gap-10 font-[15px] text-[#777]">
                <li><a href="/" class="">Home</a></li>
                <li><a href="/" class="">Shop</a></li>
                <li><a href="/" class="flex items-center gap-[2px]">Catalog <Icon icon="ep:arrow-down" width="16" height="16" /></a></li>
                <li><a href="/" class="flex items-center gap-[2px]">Blog <Icon icon="ep:arrow-down" width="16" height="16" /></a></li>
                <li><a href="/" class="flex items-center gap-[2px]">Pages <Icon icon="ep:arrow-down" width="16" height="16" /></a></li>
            </ul>
        </nav>
        <div class="flex gap-10 ">
            <Icon icon="tdesign:search" width="24" height="24" />
            <Icon icon="ri:user-fill" width="24" height="24" />
            <Icon icon="solar:heart-outline" width="24" height="24" />
            <Icon icon="vaadin:cart" width="24" height="24" />
        </div>
       
       </header>
   </main>
</template>


<style lang="scss" scoped>
   
</style>