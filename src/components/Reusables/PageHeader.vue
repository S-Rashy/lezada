<script setup></script>

<template>
  <main class="mt-22 px-8 flex gap-2 w-full h-20 items-center bg-[#f6f6f6]">
    <a href="/" class="text-[#666666]"><slot name="path"></slot></a>
    <span class="text-[#666666]">/</span>
    <p class="text-[#999999]"><slot name="page"></slot></p>
  </main>
</template>

<style lang="scss" scoped></style>
