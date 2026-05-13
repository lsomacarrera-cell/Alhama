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
  countdown.innerHTML = `Quedan ${days} días para el finde más esperado del año 🧖‍♀️`;
}

updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
