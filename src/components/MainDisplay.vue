<script setup>
import { ref } from 'vue';

const counter = ref(0);
</script>

<template>
  <div class="display p-6 grow text-lime-500">
    <h1 class="">{{ msg }}</h1>
    <button type="button" @click="++counter" class="p-4 bg-slate-400">+1</button>
    <h2 class="text-red-300">{{ counter }}</h2>
  </div>
</template>

<style scoped></style>
