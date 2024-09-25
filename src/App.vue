<script setup>
import { RouterView } from 'vue-router';

import CommandHistory from './components/CommandHistory.vue';
import UserInput from './components/UserInput.vue';

import { createCable } from './stores/cable';

const apiHost =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000'
    : 'https://ithome-ironman-2024-san-juan.zeabur.app';

const getJWTForCable = async () => {
  const response = await fetch(`${apiHost}/api/v1/login`, {
    method: 'POST'
  });
  const { token } = await response.json();
  console.log(token);
  return token;
};

import { nextTick, ref, onUnmounted } from 'vue';

const cable = ref(null);
nextTick(() => {
  handleLogin();
});
const handleLogin = async () => {
  const token = await getJWTForCable();
  if (token) {
    cable.value = createCable(token);
  } else {
    console.log('no token');
  }
};
const handleLogout = () => {
  cable.value = null;
};

onUnmounted(() => {
  handleLogout();
});

const callBack = () => {
  console.log(cable.value.subscriptions.subscriptions[0]);
  cable.value.subscriptions.subscriptions[0].get_rooms();
};
</script>

<template>
  <main>
    <div class="container mx-auto py-12 grid grid-cols-2 h-dvh gap-5">
      <div class="h-full">
        <RouterView />
      </div>
      <div class="grid grid-rows-2 gap-5">
        <CommandHistory :msg="'command history'" />
        <UserInput :msg="'prompt >'" @query-rooms="callBack" />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
