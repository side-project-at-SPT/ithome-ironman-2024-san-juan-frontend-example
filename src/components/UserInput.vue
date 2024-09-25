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
</script>

<template>
  <div class="board h-full w-full bg-sky-200 flex flex-col">
    <div class="breadcrumb p-6 bg-rose-200">breadcrumb</div>
    <div class="display p-6 bg-gray-700 grow text-lime-500">
      <h1 class="">{{ msg }}</h1>
      <div class="grid grid-cols-5 gap-5">
        <button type="button" @click="$emit('query-rooms')" class="btn">rooms</button>
        <button type="button" @click="$emit('login')" class="btn">login</button>
        <button type="button" @click="$emit('enter-lobby')" class="btn">subscribe lobby</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply bg-amber-600 text-white font-bold aspect-square rounded-3xl hover:bg-amber-400 active:transform active:scale-90 transition-transform;
}
</style>
