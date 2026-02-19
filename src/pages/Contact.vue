<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <section class="bg-white py-24">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Heading -->
      <p class="text-xs tracking-widest text-gray-400 text-center mb-4">
        SIMPLY OR WHITE
      </p>
      <h2 class="text-4xl font-light text-center mb-16">
        Clever & unique ideas
      </h2>

      <!-- Info Grid -->
      <div class="grid md:grid-cols-3 gap-12 text-center md:text-left mb-16">

        <!-- Address -->
        <div>
          <p class="text-xs tracking-widest text-gray-400 mb-4">ADDRESS</p>
          <p class="text-gray-600 leading-relaxed">
            1800 Abbot Kinney Blvd.<br />
            Unit D & E Venice
          </p>
        </div>

        <!-- Contact -->
        <div>
          <p class="text-xs tracking-widest text-gray-400 mb-4">CONTACT</p>
          <div class="space-y-2 text-gray-600">
            <p class="flex items-center justify-center md:justify-start gap-2">
              <Icon icon="mdi:phone-outline" />
              Mobile: (+88) - 1990 - 6886
            </p>
            <p class="flex items-center justify-center md:justify-start gap-2">
              <Icon icon="mdi:phone-classic" />
              Hotline: 1800 - 1102
            </p>
            <p class="flex items-center justify-center md:justify-start gap-2">
              <Icon icon="mdi:email-outline" />
              contact@lezadastore.com
            </p>
          </div>
        </div>

        <!-- Hours -->
        <div>
          <p class="text-xs tracking-widest text-gray-400 mb-4">
            HOUR OF OPERATION
          </p>
          <div class="text-gray-600">
            <p>Monday – Friday: 09:00 – 20:00</p>
            <p>Sunday & Saturday: 10:30 – 22:00</p>
          </div>
        </div>

      </div>

      <!-- Map -->
      <div class="w-full h-[400px] mb-20">
        <iframe
          class="w-full h-full grayscale"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=New%20York&output=embed"
        ></iframe>
      </div>

      <!-- Contact Form -->
      <h3 class="text-3xl font-light text-center mb-12">
        Get in touch
      </h3>

      <form class="max-w-3xl mx-auto space-y-8">
        <div class="grid md:grid-cols-2 gap-8">
          <input
            type="text"
            placeholder="Your Name"
            class="border-b border-gray-300 focus:outline-none py-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            class="border-b border-gray-300 focus:outline-none py-2"
          />
        </div>

        <input
          type="text"
          placeholder="Subject *"
          class="w-full border-b border-gray-300 focus:outline-none py-2"
        />

        <textarea
          rows="4"
          placeholder="Message *"
          class="w-full border-b border-gray-300 focus:outline-none py-2 resize-none"
        ></textarea>

        <div class="text-center pt-6">
          <button
            class="bg-black text-white px-10 py-3 text-sm tracking-widest hover:bg-gray-800 transition"
          >
            SUBMIT
          </button>
        </div>
      </form>

    </div>
  </section>
</template>
