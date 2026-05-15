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

  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  if (element) {
    element.classList.add("active");
  }
}

/* DÍAS */
function openDay(dayName) {
  const days = document.querySelectorAll(".day-content");
  days.forEach(day => day.classList.remove("active-day"));

  const selectedDay = document.getElementById(dayName);

  if (selectedDay) {
    selectedDay.classList.add("active-day");
  }
}

/* GASTOS GRUPALES */
function updateGroupExpenses() {
  const bebidas = parseFloat(document.getElementById("bebidas")?.value) || 0;
  const comida = parseFloat(document.getElementById("comida")?.value) || 0;

  const totalGroup = bebidas + comida;
  const perPerson = totalGroup / 4;

  const groupTotal = document.getElementById("group-total");
  const perPersonDisplay = document.getElementById("per-person");

  if (groupTotal) groupTotal.textContent = `${totalGroup.toFixed(2)}€`;
  if (perPersonDisplay) perPersonDisplay.textContent = `${perPerson.toFixed(2)}€`;

  const people = [
    { name: "marta", room: 175, treatment: 0 },
    { name: "marina", room: 175, treatment: 0 },
    { name: "laura", room: 175, treatment: 72 },
    { name: "elena", room: 175, treatment: 155 }
  ];

  people.forEach(person => {
    const total = person.room + person.treatment + perPerson;

    const otros = document.getElementById(`otros-${person.name}`);
    const totalEl = document.getElementById(`total-${person.name}`);
    const mobileOtros = document.getElementById(`mobile-otros-${person.name}`);
    const mobileTotal = document.getElementById(`mobile-total-${person.name}`);

    if (otros) otros.textContent = `${perPerson.toFixed(2)}€`;
    if (totalEl) totalEl.textContent = `${total.toFixed(2)}€`;

    if (mobileOtros) mobileOtros.textContent = `${perPerson.toFixed(2)}€`;
    if (mobileTotal) mobileTotal.textContent = `${total.toFixed(2)}€`;
  });
}

/* MÚSICA - estilo ZeroStress */

// Primer toque activa música
document.addEventListener("click", () => {
  const audio = document.getElementById("musica");
  const btn = document.getElementById("music-toggle");

  if (!audio) return;

  if (audio.paused) {
    audio.play().then(() => {
      if (btn) btn.textContent = "🔇";
    }).catch(() => {});
  }
}, { once: true });

// Botón parar/reanudar
function toggleMusica() {
  const audio = document.getElementById("musica");
  const btn = document.getElementById("music-toggle");

  if (!audio) return;

  if (audio.paused) {
    audio.play().catch(() => {});
    if (btn) btn.textContent = "🔇";
  } else {
    audio.pause();
    if (btn) btn.textContent = "🎵";
  }
}

/* SERVICE WORKER */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
