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

  const selectedTab = document.getElementById(tabName);

  if (selectedTab) selectedTab.classList.add("active");
  if (element) element.classList.add("active");
}

/* DÍAS */
function openDay(dayName) {
  const days = document.querySelectorAll(".day-content");
  days.forEach(day => day.classList.remove("active-day"));

  const selectedDay = document.getElementById(dayName);

  if (selectedDay) selectedDay.classList.add("active-day");
}

/* GASTOS GRUPALES */
function updateGroupExpenses() {
  const bebidas = parseFloat(document.getElementById("bebidas")?.value) || 0;
  const comida = parseFloat(document.getElementById("comida")?.value) || 0;

  const totalGroup = bebidas + comida;
  const perPerson = totalGroup / 4;

  document.getElementById("group-total").textContent = `${totalGroup.toFixed(2)}€`;
  document.getElementById("per-person").textContent = `${perPerson.toFixed(2)}€`;

  const people = [
    { name: "marta", room: 175, treatment: 0 },
    { name: "marina", room: 175, treatment: 0 },
    { name: "laura", room: 175, treatment: 72 },
    { name: "elena", room: 175, treatment: 155 }
  ];

  people.forEach(person => {
    const total = person.room + person.treatment + perPerson;

    document.getElementById(`otros-${person.name}`).textContent = `${perPerson.toFixed(2)}€`;
    document.getElementById(`total-${person.name}`).textContent = `${total.toFixed(2)}€`;

    document.getElementById(`mobile-otros-${person.name}`).textContent = `${perPerson.toFixed(2)}€`;
    document.getElementById(`mobile-total-${person.name}`).textContent = `${total.toFixed(2)}€`;
  });
}

/* MÚSICA - VERSIÓN ULTRA SIMPLE */
const audio = document.getElementById("musica");
const musicBtn = document.getElementById("music-toggle");

if (audio) {
  audio.load();
  audio.volume = 1.0;
}

/* Primer toque real */
document.addEventListener("click", iniciarMusica, { once: true });
document.addEventListener("touchstart", iniciarMusica, { once: true });

function iniciarMusica() {
  if (!audio) return;

  audio.play()
    .then(() => {
      if (musicBtn) musicBtn.textContent = "🔇";
      console.log("Música iniciada");
    })
    .catch(error => {
      console.log("Error audio:", error);
      alert("El archivo existe pero el navegador sigue bloqueándolo.");
    });
}

/* Botón */
function toggleMusica() {
  if (!audio) return;

  if (audio.paused) {
    audio.play()
      .then(() => {
        if (musicBtn) musicBtn.textContent = "🔇";
      });
  } else {
    audio.pause();
    if (musicBtn) musicBtn.textContent = "🎵";
  }
}

/* SERVICE WORKER */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
