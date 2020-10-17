const title = document.querySelector("#title");
const discription = document.querySelector("#discription");
const days = document.querySelector(".days");
const btnNextMonth = document.querySelector("#nextMonth");
const btnPrevMonth = document.querySelector("#prevMonth");
const wrapModal = document.querySelector(".wrapModal");
const btnSave = document.querySelector("#save");
const text = document.querySelector("#nameTasck");

let arrMonth = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
let arrDay = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];
let arrElemDay = [];
let date = new Date();
let stor = [];
const generatId = () => {
  return `${Math.round(Math.random() * 1e8).toString(16)}`;
};
const getRealIndexDay = (num) => {
  if (num === 0) {
    return 7;
  } else {
    return num;
  }
};

const createTask = (currentDay, currentMonth, task, id) => {
  return {
    valueMonth: currentMonth,
    valueDay: currentDay,
    valueTask: task,
    id: id,
  };
};

const createCalendar = (
  indexFerstDayCurrentMonth,
  lastDayPrevMonth,
  lastDayCurrentMonth,
  daysEndMonth,
  curentMonth
) => {
  days.innerHTML = "";
  title.innerHTML = arrMonth[curentMonth];
  discription.innerHTML = new Date().toDateString();
  for (let x = indexFerstDayCurrentMonth - 1; x > 0; x--) {
    days.innerHTML += `<div class="prevDays">${lastDayPrevMonth - x + 1}</div>`;
  }
  for (let i = 0; i < lastDayCurrentMonth; i++) {
    days.innerHTML += `<div  class = "day"><div class = "value__day"><span class = "days__elem">${arrDay[i]}<span class='add'>add Task</span></span></div></div>`;
    arrElemDay = [...document.querySelectorAll(".value__day")];
    stor.forEach((elem) => {
      if (
        arrElemDay[i].childNodes[0].childNodes[0].data === elem.valueDay &&
        title.innerHTML === elem.valueMonth
      ) {
        arrElemDay[
          i
        ].innerHTML += `<div><span class="task">${elem.valueTask}<button id="delet" data-id = "${elem.id}">&#9745</button></span></div>`;
      }
    });
  }

  for (let j = 1; j <= daysEndMonth; j++) {
    days.innerHTML += `<div class = "nextDays">${j}</div>`;
  }
};

const getDate = () => {
  const month = date.getMonth();
  const lastDays = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const lastDaysIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  const realLastDayIndex = getRealIndexDay(lastDaysIndex);
  const ferstDayIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
  const realFerstDayIndex = getRealIndexDay(ferstDayIndex);
  const prevLastDays = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  const nextDays = 7 - realLastDayIndex;
  createCalendar(realFerstDayIndex, prevLastDays, lastDays, nextDays, month);
};
getDate();

btnPrevMonth.addEventListener("click", (e) => {
  date.setMonth(date.getMonth() - 1);
  getDate();
});

btnNextMonth.addEventListener("click", (e) => {
  date.setMonth(date.getMonth() + 1);
  getDate();
});
let prevElem = null;
days.addEventListener("click", (e) => {
  const target = e.target;
  if (target.closest(".add")) {
    prevElem = target.previousSibling;
    console.log(prevElem);
    wrapModal.classList.add("open");
  } else if (target.closest("#delet")) {
    stor = stor.filter((elem) => {
      if (elem.id === target.dataset.id) {
        return false;
      } else {
        return true;
      }
    });
  }
  console.log(stor);
  getDate();
});

btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  stor.push(
    createTask(prevElem.data, title.innerHTML, text.value, generatId())
  );
  console.log(stor);
  wrapModal.classList.remove("open");
  getDate();
});
