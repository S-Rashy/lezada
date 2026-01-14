<script>
export default {
  name: 'ProductCard',
  data() {
    return {
      showToast: false,
      toastMessage: '',
    }
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
    showDiscount: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <main class="group">
    <div
      class="h-[450px] w-[380px] bg-[#F5F5F5] rounded-[4px] pt-4 flex flex-col justify-between relative overflow-hidden group"
    >
      <RouterLink
        :to="{
          path: '/product',
          query: {
            category: product.category,
            productId: product.id,
            name: product.title,
          },
        }"
        class="absolute inset-0 flex justify-center items-center p-4"
      >
        <img :src="product.image" alt="" class="max-h-full max-w-full object-contain" />
      </RouterLink>

      <div class="flex flex-col gap-4 px-4 relative z-10">
        <div
          class="bg-[#98d8ca] text-white text-sm p-2 rounded-full size-15 flex items-center justify-center"
        >
          SALE
        </div>
        <div
          class="bg-[#98d8ca] text-white text-sm p-2 rounded-full size-15 flex items-center justify-center"
        >
          - 15%
        </div>
      </div>

    </div>

    <div class="my-4 flex flex-col gap-2 text-[#333333]">
      <h4 class="font-medium truncate cursor-pointer group-hover:-translate-y-6 group-hover:opacity-0  transition-all duration-300">{{ product.id }}. {{ product.title }}</h4>
      <button class="absolute cursor-pointer translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">+ Add to cart</button>

    
      <p>
        ${{ (product.price - product.price * 0.1).toFixed(2) }}
        <span class="line-through text-[#777] ml-2"> ${{ product.price.toFixed(2) }} </span>
      </p>
    </div>
  </main>
</template>
<style lang="scss" scoped></style>
