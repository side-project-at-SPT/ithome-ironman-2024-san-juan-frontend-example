<script setup>
import { RouterView } from 'vue-router';

import CommandHistory from '@/components/CommandHistory.vue';
import UserInput from '@/components/UserInput.vue';

import { createCable, subscribeLobbyChannel } from '@/stores/cable';
import api from '@/stores/api';

// const apiHost =
//   import.meta.env.MODE === 'development'
//     ? 'http://localhost:3000'
//     : 'https://ithome-ironman-2024-san-juan.zeabur.app';

const login = async () => {
  await api.visitorLogin();
  cable.value = createCable(api.token);
  // return api.token;
};

const enterLobby = async () => {
  await subscribeLobbyChannel(cable.value);
};

// const handleSubscribeLobby = async () => {
//   if (
//     cable.value?.subscriptions?.subscriptions?.filter(
//       (sub) => sub.identifier === '{"channel":"LobbyChannel"}'
//     )?.length > 0
//   ) {
//     console.log('already subscribed with lobby');
//     return;
//   }

//   const token = await getJWTForCable();
//   if (token) {
//     cable.value = createCable(token);
//     console.log(cable.value);
//     console.log(
//       cable.value.subscriptions.subscriptions.filter(
//         (sub) => sub.identifier === '{"channel":"LobbyChannel"}'
//       )
//     );
//   } else {
//     console.log('no token');
//   }
// };
const handleLogout = () => {
  cable.value = null;
};

import { nextTick, ref, onUnmounted } from 'vue';

const cable = ref(null);
nextTick(() => {
  // handleLogin();
});

onUnmounted(() => {
  handleLogout();
});

const callBack = () => {
  console.log(cable.value.subscriptions.subscriptions[0]);
  cable.value.subscriptions.subscriptions[0].get_rooms();
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
          @query-rooms="callBack"
          @login="login"
          @enter-lobby="enterLobby"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
