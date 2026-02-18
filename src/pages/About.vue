<template>
  <main role="main" class="bg-white text-gray-800 font-sans">

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-6 py-20 text-center">
      <span class="text-xs uppercase tracking-widest text-gray-400 mb-4 block">
        - SIMPLY THE BEST -
      </span>

      <h1 class="text-4xl md:text-5xl font-light mb-6">
        Clever & unique ideas
      </h1>

      <p class="max-w-2xl mx-auto text-gray-500 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </section>

    <!-- Testimonials Carousel -->
    <section class="bg-gray-50 py-24">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="text-4xl font-light text-center mb-16">
          Testimonials
        </h2>

        <Carousel
          :items-to-show="1"
          :wrap-around="true"
          :autoplay="4000"
          :transition="500"
          class="relative"
        >
          <Slide v-for="testimonial in testimonials" :key="testimonial.name">
            <div class="text-center px-6">
              <p class="text-gray-500 italic mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
                "{{ testimonial.quote }}"
              </p>

              <div class="flex flex-col items-center">
                <img
                  :src="testimonial.avatar"
                  :alt="testimonial.name"
                  class="w-16 h-16 rounded-full grayscale mb-4"
                />

                <div class="w-8 h-px bg-gray-300 mb-3"></div>

                <h4 class="font-semibold text-sm">
                  {{ testimonial.name }}
                </h4>
                <p class="text-xs text-gray-400">
                  {{ testimonial.role }}
                </p>
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </section>

    <!-- Brands -->
    <section class="max-w-7xl mx-auto px-6 py-20">
      <h2 class="text-4xl font-light text-center mb-16">
        Our Brands
      </h2>

      <div class="flex flex-wrap justify-center items-center gap-12 md:gap-20">
        <Icon
          v-for="(brand, index) in brands"
          :key="index"
          :icon="brand"
          class="text-5xl opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
        />
      </div>
    </section>

  </main>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const testimonials = [
  {
    name: "Willie Bradley",
    role: "Reporter",
    avatar: "https://i.pravatar.cc/150?u=willie",
    quote: "There’s nothing more satisfying than a worry-free clean and responsive theme."
  },
  {
    name: "Lois Thompson",
    role: "Designer",
    avatar: "https://i.pravatar.cc/150?u=lois",
    quote: "The performance and flexibility exceeded my expectations completely."
  },
  {
    name: "Sally Ramsey",
    role: "Actor",
    avatar: "https://i.pravatar.cc/150?u=sally",
    quote: "Absolutely beautiful design and very smooth user experience."
  },
  {
    name: "Daniel Reed",
    role: "Developer",
    avatar: "https://i.pravatar.cc/150?u=daniel",
    quote: "Implementation was seamless and the UI feels incredibly premium."
  },
  {
    name: "Angela Morris",
    role: "Entrepreneur",
    avatar: "https://i.pravatar.cc/150?u=angela",
    quote: "My conversion rates improved significantly after switching."
  }
]

const brands = [
  "logos:google",
  "logos:amazon",
  "logos:spotify",
  "logos:airbnb",
  "logos:slack",
  "logos:netflix",
  "logos:stripe",
  "logos:shopify",
  "logos:adobe"
]
</script>
