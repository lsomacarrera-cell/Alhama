const countdown = document.getElementById("countdown");

const tripDate = new Date("2026-06-26T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = tripDate - now;

  if (diff <= 0) {
    countdown.innerHTML = "¡Ya estamos en Alhama! 🍾";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.innerHTML = `Quedan ${days} días para el finde del año🧖‍♀️`;
}

updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60);

function openTab(tabName, element) {
  const contents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-button");

  contents.forEach(content => content.classList.remove("active"));
  buttons.forEach(button => button.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  element.classList.add("active");
}

function openDay(dayName) {
  const days = document.querySelectorAll(".day-content");
  days.forEach(day => day.classList.remove("active-day"));

  document.getElementById(dayName).classList.add("active-day");
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

function updateGroupExpenses() {
  const bebidas = parseFloat(document.getElementById("bebidas").value) || 0;
  const comida = parseFloat(document.getElementById("comida").value) || 0;

  const totalGroup = bebidas + comida;
  const perPerson = totalGroup / 4;

  document.getElementById("group-total").textContent = `${totalGroup}€`;
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
