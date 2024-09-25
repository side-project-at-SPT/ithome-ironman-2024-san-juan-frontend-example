import ActionCable from "actioncable";

const PORT = 3000;
const WEBSOCKET_URL = `ws://localhost:${PORT}/cable`;
// const WEBSOCKET_URL = `wss://ithome-ironman-2024-san-juan.zeabur.app/cable`;

export function setupWS(element, token) {
  console.log("setupWS", element, token);
  var cable = ActionCable.createConsumer(`${WEBSOCKET_URL}?token=${token}`);

  cable.subscriptions.create("LobbyChannel", {
    received(data) {
      console.log("LobbyChannel received data", data);
      const content = [];

      for (const [key, value] of Object.entries(data)) {
        content.push(`${key}: ${JSON.stringify(value)}`);
      }

      element.insertAdjacentHTML(
        "afterbegin",
        `<div>${content.join("<br>")}</div>`
      );
    },

    connected() {
      console.log("LobbyChannel connected");
    },

    disconnected() {
      console.log("LobbyChannel disconnected");
    },

    create_room() {
      console.log("LobbyChannel create_room");
      this.perform("create_room");
    },

    get_rooms() {
      console.log("LobbyChannel get_rooms");
      this.perform("get_rooms");
    },

    get_participant_rooms() {
      console.log("LobbyChannel get_participant_rooms");
      this.perform("get_participant_rooms");
    },

    leave_room(room_key) {
      console.log("LobbyChannel leave_room", room_key);
      this.perform("leave_room", { room: room_key });
    },

    clear_rooms() {
      console.log("LobbyChannel clear_rooms");
      this.perform("clear_rooms");
    },
  });

  return cable;
}

export function setupRoomChannel(cable, room_key) {
  console.log("setupRoomChannel", cable, room_key);

  cable.subscriptions.create(
    { channel: "RoomChannel", room_id: room_key },
    {
      received(data) {
        console.log("RoomChannel received data", data);
      },

      connected() {
        console.log("RoomChannel connected");
      },

      disconnected() {
        console.log("RoomChannel disconnected");
      },

      show_room_info() {
        console.log("RoomChannel show_room_info");
        this.perform("info");
      },

      start_new_game() {
        console.log("RoomChannel start_new_game");
        this.perform("play");
      },
    }
  );
}
