<script setup lang="ts">
import { ref } from 'vue'
import FilterItem from './FilterItem.vue'

const open = ref<string | null>('size')

const toggle = (key: string) => {
  open.value = open.value === key ? null : key
}
</script>

<template>
  <div class="space-y-6">
    <FilterItem title="Custom Menu" :open="open === 'menu'" @toggle="toggle('menu')" />
    <FilterItem title="Availability" :open="open === 'availability'" @toggle="toggle('availability')" />
    <FilterItem title="Price" :open="open === 'price'" @toggle="toggle('price')" />
    <FilterItem title="Color" :open="open === 'color'" @toggle="toggle('color')" />
    <FilterItem title="Size" :open="open === 'size'" @toggle="toggle('size')" />
  </div>
</template>
