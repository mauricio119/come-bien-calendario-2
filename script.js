const monthNames = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

// Queremos semana empezando en Lunes (Lun..Dom).
// JS: getDay() => Dom=0 ... Sáb=6
function mondayIndex(jsDay){
  return (jsDay + 6) % 7; // Dom(0)->6, Lun(1)->0, ...
}

function renderCalendar(){
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  document.getElementById("monthTitle").textContent = `${monthNames[m]} ${y}`;

  const first = new Date(y, m, 1);
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const startOffset = mondayIndex(first.getDay()); // 0..6 (Lun..Dom)
  const totalCells = 42; // 6 semanas * 7 días (estable y limpio)

  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";

  // info mes anterior para relleno
  const prevDays = new Date(y, m, 0).getDate();

  for(let i=0; i<totalCells; i++){
    const cell = document.createElement("div");
    cell.className = "cell";

    let dayNumber;
    let isMuted = false;

    if(i < startOffset){
      // relleno mes anterior
      dayNumber = prevDays - (startOffset - 1 - i);
      isMuted = true;
    } else if(i >= startOffset + daysInMonth){
      // relleno mes siguiente
      dayNumber = i - (startOffset + daysInMonth) + 1;
      isMuted = true;
    } else {
      dayNumber = i - startOffset + 1;
    }

    if(isMuted) cell.classList.add("muted");

    // hoy
    if(!isMuted && dayNumber === now.getDate()){
      cell.classList.add("today");
    }

    const span = document.createElement("span");
    span.textContent = dayNumber;
    cell.appendChild(span);

    grid.appendChild(cell);
  }
}

renderCalendar();
