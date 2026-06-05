const countdown = document.getElementById("countdown");

const tripDate = new Date("2026-06-26T00:00:00");

/* CONTADOR */
function updateCountdown() {
  const now = new Date();
  const diff = tripDate - now;

  if (diff <= 0) {
    countdown.innerHTML = "¡Ya estamos en Alhama! 🍾";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.innerHTML = `Quedan ${days} días para el finde del año 🧖‍♀️`;
}

updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60);

/* PESTAÑAS */
function openTab(tabName, element) {
  const contents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-button");

  contents.forEach(content => content.classList.remove("active"));
  buttons.forEach(button => button.classList.remove("active"));

  document.getElementById(tabName)?.classList.add("active");
  element?.classList.add("active");

  startMusic();
}

/* DÍAS */
function openDay(dayName) {
  document.querySelectorAll(".day-content")
    .forEach(day => day.classList.remove("active-day"));

  document.getElementById(dayName)?.classList.add("active-day");

  startMusic();
}

/* MÚSICA */
let musicStarted = false;

function startMusic() {
  const music = document.getElementById("music");

  if (!music || musicStarted) return;

  music.play()
    .then(() => {
      musicStarted = true;
      document.getElementById("music-toggle").textContent = "🔊";
    })
    .catch(() => {
      console.log("Audio bloqueado por el navegador");
    });
}

function toggleMusic() {
  const music = document.getElementById("music");
  const button = document.getElementById("music-toggle");

  if (music.paused) {
    music.play();
    button.textContent = "🔊";
  } else {
    music.pause();
    button.textContent = "🔇";
  }
}

/* GASTOS GRUPALES */
function updateGroupExpenses() {
  const bebidas = parseFloat(document.getElementById("bebidas")?.value) || 0;
  const comida = parseFloat(document.getElementById("comida")?.value) || 0;

  const totalGroup = bebidas + comida;
  const perPerson = totalGroup / 4;

  document.getElementById("group-total").textContent =
    `${totalGroup.toFixed(2)}€`;

  document.getElementById("per-person").textContent =
    `${perPerson.toFixed(2)}€`;

  const people = [
    { name: "marta", room: 175, treatment: 0 },
    { name: "marina", room: 175, treatment: 0 },
    { name: "laura", room: 175, treatment: 72 },
    { name: "elena", room: 175, treatment: 155 }
  ];

  people.forEach(person => {
    const total = person.room + person.treatment + perPerson;

    document.getElementById(`mobile-otros-${person.name}`).textContent =
      `${perPerson.toFixed(2)}€`;

    document.getElementById(`mobile-total-${person.name}`).textContent =
      `${total.toFixed(2)}€`;
  });
}

/* SERVICE WORKER */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
