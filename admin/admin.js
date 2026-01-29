const statusEl = document.getElementById("status");
const requestList = document.getElementById("requestList");
const roomRequests = document.getElementById("roomRequests");

let isLive = false;
let watermarkEnabled = true;

// ---- STREAM CONTROL ----
document.getElementById("startStream").onclick = async () => {
  await apiCall("/stream/start", {
    mode: document.getElementById("mixMode").value
  });
  setLive(true);
};

document.getElementById("stopStream").onclick = async () => {
  await apiCall("/stream/stop");
  setLive(false);
};

function setLive(state) {
  isLive = state;
  statusEl.textContent = state ? "LIVE" : "OFFLINE";
  statusEl.className = state ? "live" : "offline";
}

// ---- RECORDING ----
document.getElementById("publishRecording").onclick = () =>
  apiCall("/recording/publish");

document.getElementById("holdRecording").onclick = () =>
  apiCall("/recording/hold");

// ---- LISTENER REQUESTS (SIMULATED) ----
function renderRequest(user) {
  const li = document.createElement("li");
  li.innerHTML = `
    ${user}
    <button onclick="approve('${user}')">Approve</button>
    <button onclick="reject('${user}')">Reject</button>
  `;
  requestList.appendChild(li);
}

window.approve = user => apiCall("/listener/approve", { user });
window.reject = user => apiCall("/listener/reject", { user });

// ---- RENTED ROOMS ----
function renderRoom(room) {
  const li = document.createElement("li");
  li.innerHTML = `
    ${room}
    <button onclick="greenLight('${room}')">Green Light</button>
  `;
  roomRequests.appendChild(li);
}

window.greenLight = room => apiCall("/room/approve", { room });

// ---- BRANDING ----
document.getElementById("injectAd").onclick = () =>
  apiCall("/ads/inject");

document.getElementById("toggleWatermark").onclick = async () => {
  watermarkEnabled = !watermarkEnabled;
  await apiCall("/watermark/toggle", { enabled: watermarkEnabled });
};

// ---- MOCK API CALL ----
async function apiCall(endpoint, data = {}) {
  console.log("API:", endpoint, data);
  return new Promise(res => setTimeout(res, 400));
}

// ---- DEMO DATA ----
renderRequest("listener_001");
renderRoom("room_kenya_podcast");
