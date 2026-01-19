<script setup>
import { Carousel, Slide, Navigation } from 'vue3-carousel'
// import { Autoplay } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
import MainButton from '../Reusables/MainButton.vue'

const slides = [
  {
    id: 1,
    title: 'ACCESSORIES',
    titleColor: '#72b0ec',
    name: ' Bottle Grinder, Small, 2-Piece',
    image:
      'https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-1_1170x.jpg?v=1613746686',
  },
  {
    id: 2,
    title: 'HANDMADE',
    titleColor: '#c5a374',
    name: ' Bottle Grinder, Small, 2-Piece',
    image:
      'https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-2_1170x.jpg?v=1613746686',
  },
  {
    id: 3,
    title: 'LIGHTING',
    titleColor: '#7A9F63',
    name: ' Bottle Grinder, Small, 2-Piece',
    image:
      'https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-3_1170x.jpg?v=1613746686',
  },
  {
    id: 4,
    title: 'DECOR',
    titleColor: '#C5A374',
    name: ' Bottle Grinder, Small, 2-Piece',
    image:
      'https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-4_1170x.jpg?v=1613746686',
  },
  
]

</script>

<template>
  <main class="flex justify-center py-10">
    <Carousel
      :items-to-show="1"
      :wrap-around="true"
      :transition="700"
      :autoplay="4000"
      :pause-autoplay-on-hover="true"
      class="hero-carousel"
    >
    <Slide
    v-for="slide in slides"
    :key="slide.id"
    >
        <div
          class="mx-auto h-[400px] w-[750px] bg-center bg-cover"
          :style="`background-image: url(${slide.image})`"
        >
          <div class="flex flex-col justify-center h-full gap-6 w-[300px] mx-15">
            <h3 class="text-lg font-semibold tracking-[3px]" :style="`color: ${slide.titleColor}`">
              {{ slide.title }}
            </h3>
            <h2 class="text-4xl font-semibold leading-[45px] tracking-[1px] text-[#333333]">
              {{ slide.name }}
            </h2>
            <MainButton class="w-[200px]"> SHOP NOW</MainButton>
          </div>
        </div>
    </Slide>

    <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </main>
</template>


<style scoped>
    .hero-carousel {
  width: 900px;
}
.carousel__prev,
.carousel__next {
  background: transparent;
  width: 120px;
  height: 120px;
    z-index: 10;

}

.carousel__prev {
  left: -90px;
}

.carousel__next {
  right: -90px;
}


:deep(.carousel__prev svg),
:deep(.carousel__next svg) {
    stroke: #333;
    stroke-width: 1.5;
  width: 100px;
  height: 100px;
}
</style>