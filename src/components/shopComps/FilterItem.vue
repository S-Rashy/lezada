<script setup lang="ts">
defineProps<{
  title: string
  open: boolean
}>()
</script>

<template>
  <div>
    <button
      class="w-full flex justify-between items-center text-lg font-medium"
      @click="$emit('toggle')"
    >
      {{ title }}
      <span class="transition-transform duration-300" :class="open ? 'rotate-180' : ''"> ˅ </span>
    </button>

    <div v-show="open" class="mt-4 text-sm text-gray-500 space-y-2">
      <p>Option 1</p>
      <p>Option 2</p>
      <p>Option 3</p>
    </div>
  </div>
</template>
