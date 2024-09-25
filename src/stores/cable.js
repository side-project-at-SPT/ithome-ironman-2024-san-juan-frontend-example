import ActionCable from 'actioncable';

export function createCable(token, version = 1, element = null) {
  if (token === null || token === undefined) {
    console.error('token is required');
    return null;
  }
  const url1 = 'ws://localhost:3000/cable';
  const url2 = 'wss://ithome-ironman-2024-san-juan.zeabur.app/cable';

  const urls = [null, url1, url2];

  const url = urls[version];

  const cable = ActionCable.createConsumer(`${url}?token=${token}`);

  cable.subscriptions.create('LobbyChannel', {
    received(data) {
      console.log('LobbyChannel received data', data);
      const content = [];

      for (const [key, value] of Object.entries(data)) {
        content.push(`${key}: ${JSON.stringify(value)}`);
      }

      element?.insertAdjacentHTML('afterbegin', `<div>${content.join('<br>')}</div>`);
    },

    connected() {
      console.log('LobbyChannel connected');
    },

    disconnected() {
      console.log('LobbyChannel disconnected');
    },

    create_room() {
      console.log('LobbyChannel create_room');
      this.perform('create_room');
    },

    get_rooms() {
      console.log('LobbyChannel get_rooms');
      this.perform('get_rooms');
    },

    get_participant_rooms() {
      console.log('LobbyChannel get_participant_rooms');
      this.perform('get_participant_rooms');
    },

    join_room(room_key) {
      console.log('LobbyChannel join_room', room_key);
      this.perform('join_room', { room: room_key });
    },

    leave_room(room_key) {
      console.log('LobbyChannel leave_room', room_key);
      this.perform('leave_room', { room: room_key });
    },

    clear_rooms() {
      console.log('LobbyChannel clear_rooms');
      this.perform('clear_rooms');
    },

    show_room_info(room_key) {
      console.log('LobbyChannel show_room_info', room_key);
      this.perform('show_room_info', { room: room_key });
    },

    start_new_game(room_key) {
      console.log('LobbyChannel start_new_game', room_key);
      this.perform('start_new_game', { room: room_key });
    }
  });

  return cable;
}
