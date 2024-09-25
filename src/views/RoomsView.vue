<script setup>
import MainDisplay from '../components/MainDisplay.vue';
import BreadCrumb from '../components/BreadCrumb.vue';
import MainDisplayBanner from '../components/MainDisplayBanner.vue';

const rooms = [
  { id: 1, name: 'room 1' },
  { id: 2, name: 'room 2' },
  { id: 3, name: 'room 3' },
  { id: 4, name: 'room 4' },
  { id: 5, name: 'room 5' }
];
</script>

<template>
  <div class="board h-full w-full bg-gray-700 flex flex-col">
    <BreadCrumb :rooms="rooms" />
    <MainDisplayBanner :msg="'Room List'" />
    <MainDisplay />
  </div>
</template>

<style scoped></style>
