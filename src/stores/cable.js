import ActionCable from 'actioncable';

export const createCable = (token, version = 1, element = null) => {
  const toDisplay = toDisplayPartial(element);

  toDisplay({ req: `connect to Action Cable...` });

  if (token === null || token === undefined) {
    console.error('token is required');
    toDisplay({ error: 'token is required' });
    return null;
  }

  const urls = [
    null,
    'ws://localhost:3000/cable',
    'wss://ithome-ironman-2024-san-juan.zeabur.app/cable'
  ];
  const url = urls[version];

  // assume that the token is valid
  toDisplay({ system: 'cable is ready' });

  return ActionCable.createConsumer(`${url}?token=${token}`);
};

export const subscribeLobbyChannel = (cable, element = null) => {
  const toDisplay = toDisplayPartial(element);

  toDisplay({ req: 'subscribe LobbyChannel' });

  if (cable === null || cable === undefined) {
    console.error('cable is not ready');
    toDisplay({ error: 'cable is not ready' });
    return null;
  }

  if (
    cable.subscriptions.subscriptions.filter(
      (sub) => sub.identifier === '{"channel":"LobbyChannel"}'
    ).length > 0
  ) {
    console.error('LobbyChannel is already subscribed');
    toDisplay({ error: 'LobbyChannel is already subscribed' });
    return null;
  }

  cable.subscriptions.create('LobbyChannel', {
    received(data) {
      console.log('LobbyChannel received data', data);
      toDisplay({ received: data });
    },

    connected() {
      console.log('LobbyChannel connected');
      toDisplay({ lobby: 'LobbyChannel connected' });
    },

    disconnected() {
      console.log('LobbyChannel disconnected');
      toDisplay({ lobby: 'LobbyChannel disconnected' });
    },

    create_room() {
      console.log('LobbyChannel create_room');
      toDisplay({ req: 'LobbyChannel.create_room' });
      this.perform('create_room');
    },

    get_rooms() {
      console.log('LobbyChannel get_rooms');
      toDisplay({ req: 'LobbyChannel.get_rooms' });
      this.perform('get_rooms');
    },

    get_participant_rooms() {
      console.log('LobbyChannel get_participant_rooms');
      toDisplay({ req: 'LobbyChannel.get_participant_rooms' });
      this.perform('get_participant_rooms');
    },

    clear_rooms() {
      console.log('LobbyChannel clear_rooms');
      toDisplay({ req: 'LobbyChannel.clear_rooms' });
      this.perform('clear_rooms');
    }
  });
};

export const unsubscribeLobbyChannel = (cable, element = null) => {
  const toDisplay = toDisplayPartial(element);

  toDisplay({ req: 'unsubscribe LobbyChannel' });

  if (cable === null || cable === undefined) {
    console.error('cable is not ready');
    toDisplay({ error: 'cable is not ready' });
    return null;
  }

  const sub = cable.subscriptions.subscriptions.find(
    (sub) => sub.identifier === '{"channel":"LobbyChannel"}'
  );

  // seen like this is not necessary
  // if (sub === null || sub === undefined) {
  //   console.error('LobbyChannel is not subscribed');
  //   toDisplay({ error: 'LobbyChannel is not subscribed' });
  //   return null;
  // }

  toDisplay({ lobby: 'unsubscribe LobbyChannel' });

  sub.unsubscribe();
};

export const subscribeRoomChannel = ({ cable, roomKey, element = null, callbackGameId = null }) => {
  const toDisplay = toDisplayPartial(element, 'room');

  toDisplay({ req: `subscribe RoomChannel ${roomKey}` });

  if (cable === null || cable === undefined) {
    console.error('cable is not ready');
    toDisplay({ error: 'cable is not ready' });
    return null;
  }
  cable.subscriptions.subscriptions.forEach((sub) => {
    console.log(sub.identifier);
  });

  if (
    cable.subscriptions.subscriptions.filter(
      (sub) => sub.identifier === `{"channel":"RoomChannel","room_id":"${roomKey}"}`
    ).length > 0
  ) {
    console.error(`RoomChannel ${roomKey} is already subscribed`);
    toDisplay({ error: `RoomChannel ${roomKey} is already subscribed` });
    return null;
  }

  cable.subscriptions.create(
    { channel: 'RoomChannel', room_id: roomKey },
    {
      received(data) {
        console.log(`RoomChannel ${roomKey} received data`, data);
        toDisplay({ received: data });
        if (data.game_id && callbackGameId) {
          callbackGameId(data.game_id);
        }
      },

      connected() {
        console.log(`RoomChannel ${roomKey} connected`);
        toDisplay({ room: `RoomChannel ${roomKey} connected` });
      },

      disconnected() {
        console.log(`RoomChannel ${roomKey} disconnected`);
        toDisplay({ room: `RoomChannel ${roomKey} disconnected` });
      }
    }
  );
};

export const unsubscribeRoomChannel = (cable, element = null) => {
  const toDisplay = toDisplayPartial(element);

  toDisplay({ req: `unsubscribe RoomChannel` });

  if (cable === null || cable === undefined) {
    console.error('cable is not ready');
    toDisplay({ error: 'cable is not ready' });
    return null;
  }

  const subs = cable.subscriptions.subscriptions.filter((sub) =>
    sub.identifier.startsWith('{"channel":"RoomChannel"')
  );

  // seen like this is not necessary
  // if (sub === null || sub === undefined) {
  //   console.error(`RoomChannel ${roomKey} is not subscribed`);
  //   toDisplay({ error: `RoomChannel ${roomKey} is not subscribed` });
  //   return null;
  // }

  subs.forEach((sub) => {
    toDisplay({ room: `unsubscribe ${sub.identifier}` });
    sub.unsubscribe();
  });

  toDisplay({ room: 'RoomChannel unsubscribed' });
};

const toDisplayPartial =
  (element, channel_type = 'lobby') =>
  (data) => {
    if (element) {
      const content = [];

      for (const [key, value] of Object.entries(data)) {
        if (key === 'req') {
          content.push(`</pre><br><pre>$ ${value}`);
          continue;
        }

        if (key === 'received') {
          const ret = [];
          for (const [k, v] of Object.entries(value)) {
            if (k === 'message') {
              ret.push(`${v}`);
            } else {
              ret.push(`${k}: ${JSON.stringify(v)}`);
            }
          }
          content.push(`[${channel_type}]: ${ret.join(' ')}`);
          continue;
        }

        content.push(`[${key}]: ${JSON.stringify(value)}`);
      }

      element.insertAdjacentHTML('beforeend', `<pre>${content}</pre>`);
      // scroll to bottom
      element.scrollTop = element.scrollHeight;
    }
  };
