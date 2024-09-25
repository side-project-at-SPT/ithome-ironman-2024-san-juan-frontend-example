<script setup>
defineProps({
  rooms: {
    type: Array,
    required: false
  }
});
</script>
<template>
  <div class="breadcrumb p-6 bg-rose-200">
    <div class="flex gap-3">
      <p>where you are =></p>
      <h1>{{ $route.path }}</h1>
    </div>
    <div class="flex gap-3">
      <button
        type="button"
        @click="$router.push($route.path.split('/').slice(0, -1).join('/') || '/')"
        class="btn"
      >
        ..
      </button>
      <button type="button" @click="$router.push('/lobby')" class="btn">Lobby</button>
      <button type="button" @click="$router.push('/help')" class="btn">Help</button>
      <button type="button" @click="$router.push('/rooms')" class="btn">rooms</button>
      <button type="button" @click="$router.push('/404')" class="btn">404</button>
    </div>
    <div class="flex gap-3 mt-3">
      <template v-for="{ id, name } of rooms" :key="id">
        <button type="button" @click="$router.push(`/rooms/${id}`)" class="btn">{{ name }}</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply p-2 bg-slate-400;
}
</style>
