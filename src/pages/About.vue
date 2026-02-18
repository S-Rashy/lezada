<script setup>
import MainButton from '@/components/Reusables/MainButton.vue'
import PageHeader from '@/components/Reusables/PageHeader.vue'
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
  "logos:spotify",
  "logos:airbnb",
  "logos:slack",
  "logos:netflix",
  "logos:stripe",
  "logos:shopify",
  "logos:adobe"
]

const breakpoints = {
  640: {
    itemsToShow: 1
  },
  768: {
    itemsToShow: 2
  },
  1024: {
    itemsToShow: 3
  }
}
</script>

<template>
    <PageHeader class="mt-24">
      <template #path>Home</template>
      <template #page>About Us</template>
    </PageHeader>
  <main class="bg-white text-gray-800 font-sans">

    <section class="max-w-7xl mx-auto px-6 py-10 text-center">
      <span class="text-xs uppercase tracking-widest text-gray-400 mb-4 block">- SIMPLY THE BEST -</span>
      <h1 class="text-4xl md:text-5xl font-light mb-6">Clever & unique ideas</h1>
      <p class="max-w-2xl mx-auto text-gray-500 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapee nonum eusmod sagittis et, met.
      </p>

      <div class="relative mt-12 group cursor-pointer overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
          alt="Our Story" 
          class="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div class="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] tracking-[0.3em] uppercase hidden lg:block text-gray-600">
          Lezada Store
        </div>
        <div class="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[10px] tracking-[0.3em] uppercase hidden lg:block text-gray-600">
          Lezada Store
        </div>
        <div class="absolute inset-0 flex flex-col items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
          <div class="w-16 h-16 border border-white rounded-full flex items-center justify-center mb-4">
             <div class="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
          </div>
          <h2 class="text-white text-4xl tracking-[0.2em] uppercase font-light">Our Story</h2>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 border-b border-gray-100">
      <div class="space-y-8">
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider mb-2">Address</h3>
          <p class="text-gray-500 text-sm leading-relaxed">1800 Abbot Kinney Blvd. Unit D & E Venice</p>
        </div>
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider mb-2">Phone</h3>
          <p class="text-gray-500 text-sm">Mobile: (+88) – 1990</p>
        </div>
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider mb-2">Email</h3>
          <p class="text-gray-500 text-sm">contact@lezadastore.com</p>
        </div>
      </div>
      <div>
        <p class="text-gray-500 leading-relaxed mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Saepe nonum eusmod sagittis nec sit, 
          scelerisque facilisi. Lorem ipsum dolor sit amet.
        </p>
        <MainButton class="bg-zinc-800 text-white px-8 py-3 text-sm flex items-center gap-2 hover:bg-black transition-colors">
          <span>+</span> LEARN MORE
        </MainButton>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-gray-50 py-24">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-light text-center mb-16">
          Testimonials
        </h2>

        <Carousel
          :wrap-around="true"
          :autoplay="4000"
          :transition="500"
          :breakpoints="breakpoints"
          :items-to-show="3"
          class="relative"
        >
           <Slide
        v-for="testimonial in testimonials"
        :key="testimonial.name"
      >
        <div class="px-6 text-center md:text-left">
          <p class="text-gray-500 italic mb-8 leading-relaxed">
            "{{ testimonial.quote }}"
          </p>

          <div class="flex items-center gap-4 justify-center md:justify-start">
            <img
              :src="testimonial.avatar"
              :alt="testimonial.name"
              class="w-14 h-14 rounded-full grayscale"
            />

            <div class="text-left">
              <h4 class="font-bold text-sm">
                {{ testimonial.name }}
              </h4>
              <p class="text-xs text-gray-400">
                / {{ testimonial.role }}
              </p>
            </div>
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

      <div class="grid grid-cols-2 sm:grid-cols-4  gap-10 place-items-center">
        <Icon
          v-for="(brand, index) in brands"
          :key="index"
          :icon="brand"
          class="text-5xl text-gray-400 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
        />
      </div>
    </section>

  </main>
</template>
