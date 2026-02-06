<script setup>
import MainButton from '../Reusables/MainButton.vue'
import { Icon } from '@iconify/vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

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
  <main class="flex overflow-hidden justify-center py-10">
    <div class="group relative w-full">
      <Carousel
        :items-to-show="1.3"
        :wrap-around="true"
        :autoplay="4000"
        snapAlign="center"
        transition="600"
      >
        <Slide v-for="slide in slides" :key="slide.id">
          <!-- v-for="slide in slides" -->
          <!-- :key="slide.id" -->
          <div
            class="mx-auto h-[400px] w-[750px] bg-center bg-cover"
            :style="`background-image: url(${slide.image})`"
          >
            <div class="flex flex-col justify-center h-full gap-6 w-[300px] mx-15">
              <h3
                class="text-lg font-semibold tracking-[3px]"
                :style="`color: ${slide.titleColor}`"
              >
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
          <Navigation>
            <template #next>
              <Icon icon="ph:caret-right-thin" class="custom-arrow" />
            </template>
            <template #prev>
              <Icon icon="ph:caret-left-thin" class="custom-arrow" />
            </template>
          </Navigation>
        </template>
      </Carousel>
    </div>
  </main>
</template>
<style scoped>
/* :deep(.carousel) {
  overflow: visible;
} */
:deep(.carousel__slide) {
  padding: 0 20px; /* Adjust this to increase/decrease the gap */
}
:deep(.carousel__prev),
:deep(.carousel__next) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  background-color: transparent;
  opacity: 0;
  color: #d1d5db;
  transition: all 0.4s ease-in-out;
  z-index: 10;
}

:deep(.carousel__prev) {
  left: 100px;
}
:deep(.carousel__next) {
  right: 100px;
}

.group:hover :deep(.carousel__prev),
.group:hover :deep(.carousel__next) {
  opacity: 1;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  color: #333333 !important;
  transform: translateY(-50%) scale(1.1);
}
:deep(.carousel__slide--active) {
  opacity: 1;
}
:deep(.carousel__slide:not(.carousel__slide--active)) {
  opacity: 0.8;
}
.custom-arrow {
  font-size: 120px;
}
</style>
