<script setup>
const menuCategories = [
  {
    title: 'Popular',
    items: [
      { name: 'Causal', badge: 'NEW' },
      { name: 'Exclusive' },
      { name: 'Aligori' },
      { name: 'Churidar' },
      { name: 'Shalwar' },
      { name: 'Jeans' },
      { name: 'Dress' }
    ]
  },
  {
    title: 'Best Selling',
    items: [
      { name: 'Sandals' },
      { name: 'Bast shoe', badge: 'NEW' },
      { name: 'Blucher shoe' },
      { name: 'Boat shoe' },
      { name: 'Brogan' },
      { name: 'Chelsea boot' },
      { name: 'Brothel creeper' }
    ]
  },
  {
    title: 'New Product',
    items: [
      { name: 'Belt' },
      { name: 'Wallets' },
      { name: 'Card Holders', badge: 'SALE' },
      { name: 'Bags' },
      { name: 'Executive bag' },
      { name: 'Cufflinks' },
      { name: 'Cap' }
    ]
  }
];
</script>

<template>
  <nav class=" bg-white">
    <div class="relative inline-block group">
      
     

      <div class="absolute left-0 top-full z-50 w-[900px] 
                  opacity-0 translate-y-6 invisible 
                  group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible 
                  transition-all duration-300 ease-out 
                  bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100">
        
        <div class="grid grid-cols-4 gap-12">
          
          <div v-for="{ title, items } in menuCategories" :key="title">
            <h3 class="font-bold text-gray-900 mb-6 text-sm">{{ title }}</h3>
            
            <ul class="space-y-4">
              <li v-for="{ name, badge } in items" :key="name" class="flex flex-col items-start group/link">
                
                <div v-if="badge" class="relative mb-1">
                  <span :class="[
                    badge === 'NEW' ? 'bg-red-500' : 'bg-[#76d7c4]',
                    'text-[9px] text-white px-1.5 py-0.5 font-black rounded-sm leading-none uppercase'
                  ]">
                    {{ badge }}
                  </span>
                  <div v-if="badge === 'SALE'" class="absolute -bottom-1 left-2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#76d7c4]"></div>
                </div>

                <a href="#" class="text-gray-500 group-hover/link:text-black text-[14px] transition-colors">
                  {{ name }}
                </a>
              </li>
            </ul>
          </div>

          <div class="pl-10 border-l border-gray-100">
            <div class="overflow-hidden mb-4">
              <img src="https://picsum.photos/seed/art/400/320" alt="Featured" class="w-full h-44 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 class="text-gray-800 font-bold text-sm">Organic Moon Fruit</h4>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-black font-bold text-sm">$39.00</span>
              <span class="text-gray-400 line-through text-xs">$60.00</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>