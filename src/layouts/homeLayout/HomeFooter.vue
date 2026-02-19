<script setup>
import { Icon } from '@iconify/vue'
import CurrencyDD from '@/components/CurrencyDD.vue';
</script>

<template>
  <footer class="px-12 py-24 flex justify-between bg-[#f8f8f8]">
    <div class="space-y-8 text-[#777]">
      <div class="flex gap-4">
        <a href="">Search</a>
        <a href="">About us</a>
        <a href="">Contact</a>
        <a href="">Policy</a>
        <a href="">FAQs</a>
      </div>
      <div class="flex gap-1">
        <p>
          © 2018 lezada. All Rights Reserved | <span class="font-bold">(+00) 123 567990 </span> |
        </p>
        <p>contact@lezada.com</p>
      </div>
    </div>

    <div class="flex flex-col space-y-10 items-end">
      <div class="flex gap-6 text-">
        <Icon icon="line-md:twitter-filled" width="20" height="20" />
        <Icon icon="icomoon-free:instagram" width="20" height="20" />
        <Icon icon="uil:linkedin" width="20" height="20" />
        <Icon icon="line-md:youtube-filled" width="20" height="20" />
        <Icon icon="ri:facebook-fill" width="20" height="20" />
      </div>

      <div class="flex gap-2">
        <img src="../../assets/footerImgs/visa.svg" alt="" class="w-10" />
        <img src="../../assets/footerImgs/mastercard.svg" alt="" class="w-10" />
        <img src="../../assets/footerImgs/amex.svg" alt="" class="w-10" />
        <img src="../../assets/footerImgs/paypal.svg" alt="" class="w-10" />
        <img src="../../assets/footerImgs/diners.svg" alt="" class="w-10" />
        <img src="../../assets/footerImgs/discover.svg" alt="" class="w-10" />
      </div>

      <div class="flex gap-4">
        <!-- <select name="" id="" class="border p-3 outline-none">
          <option value="">USD $</option>
          <option value="">EUR €</option>
          <option value="">NGN ₦</option>
          <option value="">GBP £</option>
          <option value="">JPY ¥</option>
        </select> -->
        <CurrencyDD/>

        <select name="" id="" class="border p-3 outline-none">
          <option value="">English</option>
          <option value="">Francais</option>
          <option value="">Italiano</option>
          <option value="">Espanyol</option>
          <option value=""></option>
        </select>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped></style>
