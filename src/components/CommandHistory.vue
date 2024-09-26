<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="board h-full w-full bg-gray-700 flex flex-col relative">
    <div class="breadcrumb h-12 flex items-center ps-6 bg-rose-200 relative">breadcrumb</div>
    <div
      class="display top-12 px-6 text-lime-500 w-full overflow-y-scroll bottom-0 absolute scrollbar"
      id="display"
    ></div>
  </div>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar,
.scrollbar::-webkit-scrollbar-track {
  @apply bg-opacity-0 bg-gray-700;
  border-radius: 100vh;
}
.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 100vh;
  @apply bg-opacity-100 bg-gray-600;
}
.scrollbar::-webkit-scrollbar-thumb:hover {
  @apply cursor-grab;
}
</style>
