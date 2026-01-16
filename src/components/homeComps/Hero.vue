<script setup>
import MainButton from '../Reusables/MainButton.vue';

const slides = [
    {
    id: 1,
    title: 'ACCESSORIES',
    titleColor: '#72b0ec',
    name: ' Bottle Grinder, Small, 2-Piece',
    image: 'https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-1_1170x.jpg?v=1613746686',
    },
    // {
    // id: 2,
    // title: 'HANDMADE',
    // titleColor: '#c5a374',
    // name: ' Bottle Grinder, Small, 2-Piece',
    // image: 'https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-2_1170x.jpg?v=1613746686',
    // },
    // {
    // id: 3,
    // title: 'LIGHTING',
    // titleColor: '#7A9F63',
    // name: ' Bottle Grinder, Small, 2-Piece',
    // image: 'https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-3_1170x.jpg?v=1613746686',
    // },
    // {
    // id: 4,
    // title: 'DECOR',
    // titleColor: '#C5A374',
    // name: ' Bottle Grinder, Small, 2-Piece',
    // image: 'https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-4_1170x.jpg?v=1613746686',
    // },

]

</script>

<template>
    <main class="">

        <div  v-for="slide in slides" :key="slide.id"
        class="mx-auto h-[400px] w-[750px] bg-center bg-cover"
            :style="`background-image: url(${slide.image})`"
            >
                <div class="flex flex-col justify-center h-full gap-6 w-[300px] mx-15">
                    <h3 class="text-lg font-semibold tracking-[3px]" :style="`color: ${slide.titleColor}`">{{slide.title}}</h3>
                    <h2 class="text-4xl font-semibold leading-[45px] tracking-[1px] text-[#333333]">{{slide.name}}</h2>
                    <MainButton class="w-[200px]"> SHOP NOW</MainButton>
                </div>
            </div>
        
    </main>
</template>



<style lang="scss" scoped>

</style>