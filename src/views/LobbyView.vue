<script setup>
import MainDisplay from '@/components/MainDisplay.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import MainDisplayBanner from '@/components/MainDisplayBanner.vue';
</script>

<template>
  <div class="board h-full w-full bg-gray-700 flex flex-col">
    <BreadCrumb />
    <MainDisplayBanner />
    <MainDisplay />
  </div>
</template>

<style scoped></style>
