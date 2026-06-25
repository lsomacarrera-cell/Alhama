const countdown = document.getElementById("countdown");

const tripDate = new Date("2026-06-26T17:00:00");
const endTripDate = new Date("2026-06-28T18:00:00");

/* CONTADOR */
function updateCountdown() {
  const now = new Date();

  if (now >= endTripDate) {
    countdown.innerHTML =
      "💙 Gracias por un fin de semana inolvidable.<br>¡Hasta la próxima escapada! 🥂";
    return;
  }

  if (now >= tripDate) {
    countdown.innerHTML = "🍾 ¡Ya estamos en Alhama!";
    return;
  }

  const diff = tripDate - now;
const days = Math.floor(diff / (1000 * 60 * 60 * 24));

if (days === 0) {
  countdown.innerHTML = "⏳ ¡Hoy empieza Alhama!";
} else {
  countdown.innerHTML = `⏳ Alhama empieza en ${days} día${days === 1 ? "" : "s"}`;
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

  localStorage.setItem("alhama_bebidas", bebidas);
  localStorage.setItem("alhama_comida", comida);

  const totalGroup = bebidas + comida;
  const perPerson = totalGroup / 4;

  const groupTotal = document.getElementById("group-total");
  const perPersonDisplay = document.getElementById("per-person");

  if (groupTotal) groupTotal.textContent = `${totalGroup.toFixed(2)}€`;
  if (perPersonDisplay) perPersonDisplay.textContent = `${perPerson.toFixed(2)}€`;

  const people = [
    { name: "marta", room: 175, treatment: 76 },
    { name: "marina", room: 175, treatment: 98 },
    { name: "laura", room: 175, treatment: 72 },
    { name: "elena", room: 175, treatment: 67 }
  ];

  people.forEach(person => {
    const total = person.room + person.treatment + perPerson;

    const mobileOtros = document.getElementById(`mobile-otros-${person.name}`);
    const mobileTotal = document.getElementById(`mobile-total-${person.name}`);

    if (mobileOtros) {
      mobileOtros.textContent = `${perPerson.toFixed(2)}€`;
    }

    if (mobileTotal) {
      mobileTotal.textContent = `${total.toFixed(2)}€`;
    }
  });
}

/* SERVICE WORKER */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

/* PREPARATIVOS */
document.addEventListener("DOMContentLoaded", () => {
  const preparativosArea = document.getElementById("preparativosArea");
  const bebidasInput = document.getElementById("bebidas");
  const comidaInput = document.getElementById("comida");

  if (!preparativosArea) return;

  const saved = localStorage.getItem("alhama_preparativos");

  if (saved) {
    preparativosArea.value = saved;
  }

  const savedBebidas = localStorage.getItem("alhama_bebidas");
  const savedComida = localStorage.getItem("alhama_comida");

  if (bebidasInput && savedBebidas !== null) {
    bebidasInput.value = savedBebidas;
  }

  if (comidaInput && savedComida !== null) {
    comidaInput.value = savedComida;
  }

  updateGroupExpenses();

  preparativosArea.addEventListener("input", () => {
    localStorage.setItem(
      "alhama_preparativos",
      preparativosArea.value
    );
  });
});
