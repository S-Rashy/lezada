<script setup>
import MainButton from './MainButton.vue'

const props = defineProps({
  to: {
    type: String,
    default: '/',
  },
})
const emit = defineEmits(['close-modal'])
const close = () => {
  emit('close-modal')
}
</script>

<template>
  <div class="w-full h-full inset-0 fixed flex items-center justify-center bg-black/30 z-100">
    <div class="bg-white h-59 w-120 py-12 px-12 space-y-8 text-center">
      <h5><slot name="info"></slot></h5>

      <slot name="button">
        <!-- <RouterLink :to="to"> -->
        <MainButton @click="close"><slot name="btn"></slot> </MainButton>
        <!-- </RouterLink> -->
      </slot>
      <slot> </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
