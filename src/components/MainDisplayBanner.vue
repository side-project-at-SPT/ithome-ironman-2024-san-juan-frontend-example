<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="breadcrumb p-2 bg-yellow-400">
    <h1 class="text-2xl">{{ msg || $route.name }}</h1>
  </div>
</template>

<style scoped></style>
