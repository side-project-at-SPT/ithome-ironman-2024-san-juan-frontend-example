<script setup>
import router from '@/router';

import MainDisplay from '@/components/MainDisplay.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import MainDisplayBanner from '@/components/MainDisplayBanner.vue';

const printCable = () => {
  console.log('print cable');
};

const showRoomInfo = () => {
  console.log('show room info');
};

const startGame = () => {
  console.log('start game');
};
</script>

<template>
  <div class="board h-full w-full bg-gray-700 flex flex-col">
    <BreadCrumb />
    <MainDisplayBanner :msg="`Game ${$route.params.id}`" />
    <!-- <MainDisplay /> -->
    <div class="p-6">
      <div class="grid grid-rows-5 grid-cols-5 gap-3 mt-3">
        <button type="button" @click="printCable" class="btn">print cable</button>
        <button type="button" @click="showRoomInfo" class="btn">show room info</button>
        <button type="button" @click="startGame" class="btn">start game</button>
      </div>
    </div>
  </div>
</template>
