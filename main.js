import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import { setupWS } from "./ws.js";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="login" type="button">Login</button>
    </div>
    <div class="card">
      <button id="logout" type="button">Logout</button>
    </div>
    <div class="card">
      <button id="StartNewGame" type="button">Start New Game</button>
    </div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="panel">
      <button id="showRooms">
        <span>show Rooms</span>
      </button>
      <button id="showParticipants">
        <span>show Participants</span>
      </button>
      <button id="showRoomInfo">
        <span>show Room info</span>
      </button>
      <button id="createRoom">
        <span>create Room</span>
      </button>
      <button id="joinRoom">
        <span>join Room</span>
      </button>
      <button id="leaveRoom">
        <span>leave Room</span>
      </button>
      <button id="clearRooms">
        <span>clear Rooms</span>
      </button>
    </div>
    <div class="card">
      <div id="message"></div>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
// setupWS(document.querySelector("#message"));

var cable = null;

const currentEnvironment = "development";
// const currentEnvironment = "production";
console.log("currentEnvironment", currentEnvironment);

document.querySelector("#login").addEventListener("click", async () => {
  console.log("login clicked");
  if (cable) {
    logout();
    console.log("cable reconnecting...");
  }
  const host =
    currentEnvironment === "development"
      ? "http://localhost:3000"
      : "https://ithome-ironman-2024-san-juan.zeabur.app";
  const response = await fetch(`${host}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("data", data);

  const token = data.token;

  cable = setupWS(document.getElementById("message"), token);

  // bind buttons
  document
    .querySelector("#showRooms")
    .addEventListener("click", handleGetRooms);
  document
    .querySelector("#showParticipants")
    .addEventListener("click", handleGetParticipantRooms);
  document
    .querySelector("#createRoom")
    .addEventListener("click", handleCreateRoom);
  document.querySelector("#joinRoom").addEventListener("click", handleJoinRoom);
  document
    .querySelector("#leaveRoom")
    .addEventListener("click", handleLeaveRoom);
  document
    .querySelector("#clearRooms")
    .addEventListener("click", handleClearRooms);
  document
    .querySelector("#showRoomInfo")
    .addEventListener("click", handleShowRoomInfo);
  document
    .querySelector("#StartNewGame")
    .addEventListener("click", handleStartNewGame);
});

document.querySelector("#logout").addEventListener("click", async () => {
  console.log("logout clicked");
  await logout();
});

const handleGetRooms = (data) => {
  console.log("show Rooms");
  cable.subscriptions.subscriptions[0].get_rooms();
};

const handleGetParticipantRooms = (data) => {
  console.log("show Participants");
  cable.subscriptions.subscriptions[0].get_participant_rooms();
};

const handleCreateRoom = (data) => {
  console.log("create Room");
  cable.subscriptions.subscriptions[0].create_room();
};

const handleLeaveRoom = () => {
  let room_key = prompt("Enter room name");
  if (room_key === null || room_key === "") {
    console.warn("leave room canceled");
    return;
  }
  cable.subscriptions.subscriptions[0].leave_room(room_key);
  console.log(`Room ${room_key} left`);
};

const handleClearRooms = (data) => {
  console.log("clear Rooms");
  cable.subscriptions.subscriptions[0].clear_rooms();
};

const handleJoinRoom = () => {
  let room_key = prompt("Enter room name");
  if (room_key === null || room_key === "") {
    console.warn("join room canceled");
    return;
  }
  cable.subscriptions.subscriptions[0].join_room(room_key);
  console.log(`Room ${room_key} joined`);
};

const handleShowRoomInfo = () => {
  let room_key = prompt("Enter room name");
  if (room_key === null || room_key === "") {
    console.warn("show room info canceled");
    return;
  }
  cable.subscriptions.subscriptions[0].show_room_info(room_key);
  console.log(`Room ${room_key} info shown`);
};

const handleStartNewGame = () => {
  let room_key = prompt("Enter room name");
  if (room_key === null || room_key === "") {
    console.warn("start new game canceled");
    return;
  }
  cable.subscriptions.subscriptions[0].start_new_game(room_key);
  console.log(`Room ${room_key} new game started`);
};

const logout = async () => {
  if (cable) {
    cable.disconnect();
    // clear message
    document.getElementById("message").innerHTML = "";
    // clear binding
    document
      .querySelector("#showRooms")
      .removeEventListener("click", handleGetRooms);
    document
      .querySelector("#showParticipants")
      .removeEventListener("click", handleGetParticipantRooms);
    document
      .querySelector("#createRoom")
      .removeEventListener("click", handleCreateRoom);
    document
      .querySelector("#joinRoom")
      .removeEventListener("click", handleJoinRoom);
    document
      .querySelector("#leaveRoom")
      .removeEventListener("click", handleLeaveRoom);
    document
      .querySelector("#clearRooms")
      .removeEventListener("click", handleClearRooms);
    document
      .querySelector("#showRoomInfo")
      .removeEventListener("click", handleShowRoomInfo);
    document
      .querySelector("#StartNewGame")
      .removeEventListener("click", handleStartNewGame);
  }
};
