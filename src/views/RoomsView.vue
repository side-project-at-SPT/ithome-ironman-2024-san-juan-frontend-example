<script setup>
import { nextTick, ref, onMounted, onUnmounted } from 'vue';

import MainDisplay from '@/components/MainDisplay.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import MainDisplayBanner from '@/components/MainDisplayBanner.vue';

import api from '@/stores/api';

const rooms = ref([]);

const handleQueryRooms = async () => {
  const df = await api.queryRooms();
  console.table(df);
  rooms.value = df;
};

onMounted(() => {
  handleQueryRooms();
});
</script>

<template>
  <div class="board h-full w-full bg-gray-700 flex flex-col">
    <BreadCrumb />
    <MainDisplayBanner :msg="'Room List'" />
    <!-- <MainDisplay /> -->
    <div class="p-6">
      <div class="grid grid-rows-5 grid-cols-5 gap-3 mt-3">
        <button type="button" @click="$router.push(`/rooms/new`)" class="btn-create">
          {{ '➕' }}
        </button>
        <template v-for="{ id, name } of rooms" :key="id">
          <button type="button" @click="$router.push(`/rooms/${id}`)" class="btn">
            {{ name }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply p-2 bg-slate-400 aspect-square rounded-3xl;
}
.btn-create {
  @apply p-2 bg-green-200 aspect-square rounded-3xl;
}
</style>
