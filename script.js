// Data do início do relacionamento (data em que você começaram a namorar)
const startDate = new Date('2022-06-30T16:00:00');  // Substitua com a data correta

function updateTime() {
  const now = new Date();
  
  // Calcular a diferença entre as datas
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  
  // Ajustar para quando o mês atual ainda não completou a diferença
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Ajustar dias quando o dia atual é menor que o dia de início
  if (days < 0) {
    // Subtrair 1 mês e calcular os dias restantes
    months--;
    if (months < 0) {
      months += 12;
      years--;
    }

    // Pegar o número de dias do mês anterior
    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    days += new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0).getDate();
  }

  // Calcular a diferença em horas, minutos e segundos
  const diffInMilliseconds = now - startDate;
  const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

  // Atualizar os elementos HTML com a diferença de tempo
  document.getElementById('years').textContent = `${years} ano(s)`;
  document.getElementById('months').textContent = `${months} mês(es)`;
  document.getElementById('days').textContent = `${days} dia(s)`;
  document.getElementById('hours').textContent = `${hours} hora(s)`;
  document.getElementById('minutes').textContent = `${minutes} minuto(s)`;
  document.getElementById('seconds').textContent = `${seconds} segundo(s)`;
}

// Atualizar o contador a cada segundo
setInterval(updateTime, 1000);







