<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  },
  cable: {
    type: Object,
    required: false
  }
});

import { defineEmits } from 'vue';
</script>

<template>
  <div class="board h-full w-full bg-sky-200 flex flex-col">
    <div class="breadcrumb p-6 bg-rose-200">breadcrumb</div>
    <div class="display p-6 bg-gray-700 grow text-lime-500">
      <h1 class="">{{ msg }}</h1>
      <div class="bg-sky-800 p-3">
        <button type="button" @click="$emit('query-rooms')" class="w-full">rooms</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
