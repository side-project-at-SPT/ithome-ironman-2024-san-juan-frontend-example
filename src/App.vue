<script setup>
import { nextTick, ref, onUnmounted, provide } from 'vue';
import { RouterView } from 'vue-router';

import router from '@/router';
import CommandHistory from '@/components/CommandHistory.vue';
import UserInput from '@/components/UserInput.vue';

import {
  createCable,
  subscribeLobbyChannel,
  unsubscribeLobbyChannel,
  unsubscribeRoomChannel
} from '@/stores/cable';
import api from '@/stores/api';

const login = async () => {
  await api.visitorLogin();
  if (cable.value) {
    cable.value.disconnect();
  }
  cable.value = createCable(api.token, 1, document.getElementById('display'));
};

const enterLobby = async () => {
  await subscribeLobbyChannel(cable.value, document.getElementById('display'));
};

const leaveLobby = async () => {
  await unsubscribeLobbyChannel(cable.value, document.getElementById('display'));
};

const leaveRoom = async () => {
  await unsubscribeRoomChannel(cable.value, document.getElementById('display'));
};

const handleLogout = () => {
  cable.value = null;
};

const destroyAllRooms = async () => {
  if (await api.destroyAllRooms()) {
    console.log('all rooms destroyed');
    if (router.currentRoute.value.name === 'Room List') {
      // FIXME: page does not refresh
      router.push({ name: 'push back', query: { path: '/rooms' } });
    } else {
      router.push({ name: 'Room List' });
    }
  } else {
    console.warn('failed to destroy all rooms');
  }
};

const handleQueryRooms = async () => {
  // const df = await api.queryRooms();
  router.push({ name: 'Room List' });
  // console.table(df);
};

const cable = ref(null);

provide('cable', cable);
nextTick(() => {
  // handleLogin();
});

onUnmounted(() => {
  handleLogout();
});

const callBack = () => {
  const lobbyChannel = cable.value?.subscriptions?.subscriptions
    ?.filter((sub) => sub.identifier === JSON.stringify({ channel: 'LobbyChannel' }))
    ?.at(0);
  if (lobbyChannel) {
    lobbyChannel.perform('get_rooms');
    router.push({ name: 'Room List' });
  } else {
    alert('please login first');
  }
};
</script>

<template>
  <main class="text-black">
    <div class="container mx-auto py-12 grid grid-cols-2 h-dvh gap-5">
      <div class="h-full">
        <RouterView />
      </div>
      <div class="grid grid-rows-2 gap-5">
        <CommandHistory :msg="'command history'" />
        <UserInput
          :msg="'prompt >'"
          @query-rooms="handleQueryRooms"
          @login="login"
          @enter-lobby="enterLobby"
          @leave-lobby="leaveLobby"
          @leave-room="leaveRoom"
          @destroy-all-rooms="destroyAllRooms"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
