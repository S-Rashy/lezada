<script setup>
const menuCategories = [
  {
    title: 'Popular',
    items: [
      { name: 'Causal' },
      { name: 'Exclusive', badge: 'NEW' },
      { name: 'Aligori' },
      { name: 'Churidar' },
      { name: 'Shalwar' },
      { name: 'Jeans' },
      { name: 'Dress' },
    ],
  },
  {
    title: 'Best Selling',
    items: [
      { name: 'Sandals' },
      { name: 'Bast shoe' },
      { name: 'Blucher shoe', badge: 'NEW' },
      { name: 'Boat shoe' },
      { name: 'Brogan' },
      { name: 'Chelsea boot' },
      { name: 'Brothel creeper' },
    ],
  },
  {
    title: 'New Product',
    items: [
      { name: 'Belt' },
      { name: 'Wallets', badge: 'SALE'  },
      { name: 'Card Holders'},
      { name: 'Bags' },
      { name: 'Executive bag' },
      { name: 'Cufflinks' },
      { name: 'Cap' },
    ],
  },
]
</script>

<template>
  <nav class="bg-white">
    <div class="relative inline-block group">
      <div
        class="absolute left-0 top-full z-50 w-[1000px] items-center opacity-0 -translate-x-95 translate-y-8 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 ease-out bg-white p-10 shadow-md"
      >
        <div class="grid grid-cols-4 gap-12">
          <div v-for="{ title, items } in menuCategories" :key="title">
            <h3 class="text-[#333333] mb-6 text-base">{{ title }}</h3>

            <ul class="space-y-4">
              <li
                v-for="{ name, badge } in items"
                :key="name"
                class="flex flex-col items-start group/link"
              >
                <div
                  v-if="badge"
                  class="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                  <span
                    :class="[
                      badge === 'NEW' ? 'bg-red-500' : 'bg-[#76d7c4]',
                      'text-[10px] text-white px-2 py-1 font-bold uppercase shadow-md',
                    ]"
                  >
                    {{ badge }}
                  </span>
                  <div
                    class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-current"
                    :style="{ color: badge === 'NEW' ? '#ef4444' : '#76d7c4' }"
                  ></div>
                </div>

                <a href="#" class="text-gray-500 text-[14px] transition-colors hover:text-black">
                  {{ name }}
                </a>
              </li>
            </ul>
          </div>

          <div class="pl-10 border-l border-gray-100">
            <div class="overflow-hidden mb-4 w-full">
              <img
                src="https://lezada-demo.myshopify.com/cdn/shop/products/per1_360x.jpg?v=1551249474"
                alt="Featured"
                class="w-full h-44 object-contain "
              />
            </div>
            <h4 class=" font-medium text-sm">Organic Moon Fruit</h4>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-black text-sm">$39.00</span>
              <span class="text-gray-400 line-through text-xs">$60.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
