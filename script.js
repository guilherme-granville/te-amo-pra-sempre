const startDate = new Date('2022-06-30T16:00:00'); // Data e horário inicial

function updateTime() {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (days < 0) {
    let lastMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += lastMonthDays;
    months--;

    if (months < 0) {
      months += 12;
      years--;
    }
  }

  const diffInMilliseconds = now - startDate;
  const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

  const timeUnits = {
    years: ["Ano", "Anos"],
    months: ["Mês", "Meses"],
    days: ["Dia", "Dias"],
    hours: ["Hora", "Horas"],
    minutes: ["Minuto", "Minutos"],
    seconds: ["Segundo", "Segundos"]
  };

  for (const unit in timeUnits) {
    const value = eval(unit);
    document.getElementById(unit).textContent = ` ${value} ${timeUnits[unit][value === 1 ? 0 : 1]} `;
  }
}

setInterval(updateTime, 1000);

const openBtn = document.getElementById('openBtn');
const musicImage = document.getElementById('musicImage');
const closeBtn = document.getElementById('closeBtn');
const menu = document.getElementById('glass-container');

openBtn.addEventListener('click', function() {
  menu.style.left = '0';
  openBtn.style.display = 'none';
});

closeBtn.addEventListener('click', function() {
  menu.style.left = '-550px';
  openBtn.style.display = 'block';
});

document.addEventListener('click', function(event) {
  if (!menu.contains(event.target) && event.target !== openBtn && event.target !== musicImage) {
    menu.style.left = '-550px';
    openBtn.style.display = 'block';
  }
});

