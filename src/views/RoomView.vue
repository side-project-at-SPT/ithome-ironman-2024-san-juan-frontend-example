<script setup>
import { inject, nextTick } from 'vue';

import router from '@/router';
import MainDisplay from '@/components/MainDisplay.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import MainDisplayBanner from '@/components/MainDisplayBanner.vue';

import { subscribeRoomChannel } from '@/stores/cable';
import { toDisplayPartial } from '@/stores/display';

const toDisplay = toDisplayPartial(document.getElementById('display'));

const cable = inject('cable');

const printCable = () => {
  console.log(cable.value);
  if (cable.value) {
    const ret = [];
    for (const sub of cable.value.subscriptions.subscriptions) {
      ret.push(sub.identifier);
    }
    toDisplay({ debug: ret });
  } else {
    toDisplay({ debug: 'cable is not ready' });
  }
};

const showRoomInfo = () => {
  callRoomChannelAction('info');
};

const startGame = () => {
  callRoomChannelAction('play');
};

const callRoomChannelAction = (action, ...args) => {
  const channel = cable.value?.subscriptions?.subscriptions
    ?.filter(
      (sub) =>
        sub.identifier ===
        JSON.stringify({ channel: 'RoomChannel', room_id: router.currentRoute.value.params.id })
    )
    ?.at(0);
  if (channel) {
    channel.perform(action, ...args);
  } else {
    toDisplay({ debug: 'cable is not ready' });
  }
};

nextTick(() => {
  subscribeRoomChannel({
    cable: cable.value,
    roomKey: router.currentRoute.value.params.id,
    element: document.getElementById('display'),
    callbackGameId: (gameId) => {
      router.push({ name: 'Game', params: { id: gameId } });
    }
  });
});
</script>

<template>
  <div class="board h-full w-full bg-gray-700 flex flex-col">
    <BreadCrumb />
    <MainDisplayBanner :msg="`Room ${$route.params.id}`" />
    <!-- <MainDisplay /> -->
    <div class="p-6">
      <div class="grid grid-rows-5 grid-cols-5 gap-3 mt-3">
        <button type="button" @click="printCable" class="btn">print cable</button>
        <button type="button" @click="showRoomInfo" class="btn">show room info</button>
        <button type="button" @click="startGame" class="btn">start game</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply p-2 bg-slate-400 aspect-square rounded-3xl;
}
</style>
