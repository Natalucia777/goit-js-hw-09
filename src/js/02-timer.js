import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

let timerID = null;
let intervalID = null;
buttonStart.setAttribute('disabled', true);
// buttonStart.disabled = true;
  

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
    buttonStart.removeAttribute('disabled');
    // buttonStart.disabled = false;
    }
    
    const now = new Date();
    const selectDate = selectedDates[0].getTime();
    const timeNow = now.getTime();
    buttonStart.removeAttribute('disabled');
    let start = timeNow - selectDate;
    const { days, hours, minutes, seconds } = convertMs(-start);
    timerDays.textContent = days;
    timerHours.textContent = hours;
    timerMinutes.textContent = minutes;
    timerSeconds.textContent = seconds;
    localStorage.setItem('timer', -start);
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days

  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function showTimer() {
  intervalID = setInterval(() => {
    if (localStorage.getItem('timer') < 1000) {
      clearInterval(intervalID);
      localStorage.removeItem('timer');
      return;
    }

    let dateTimer = localStorage.getItem('timer') - 1000;
    localStorage.setItem('timer', dateTimer);
    const addLeadingZero = value => String(value).padStart(2, '0');
    const { days, hours, minutes, seconds } = convertMs(dateTimer);
    timerDays.textContent = addLeadingZero(`${days}`);
    timerHours.textContent = addLeadingZero(`${hours}`);
    timerMinutes.textContent = addLeadingZero(`${minutes}`);
    timerSeconds.textContent = addLeadingZero(`${seconds}`);
  }, 1000);
buttonStart.addEventListener('click', showTimer);
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
