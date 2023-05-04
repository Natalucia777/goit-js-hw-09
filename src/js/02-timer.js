import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');
const inputDate = document.querySelector('input#datetime-picker');

buttonStart.disabled = true;
let intervalID = null;
buttonStart.addEventListener('click', showTimer);

function showTimer() {
  buttonStart.disabled = true;
  inputDate.disabled = true;

  intervalID = setInterval(() => {
    const optionsDate = flatpickr('#datetime-picker', options);
    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
          buttonStart.disabled = true;
          return Notify.failure('Please choose a date in the future');
        } else {
          buttonStart.disabled = false;
        }
      },
    };
    const addTime = optionsDate.selectedDates[0] - Date.now();

    if (addTime < 1000) {
      buttonStart.disabled = false;
      inputDate.disabled = false;
      clearInterval(intervalID);
    }
    const newTime = convertMs(addTime);
    timerDays.textContent = addLeadingZero(newTime.days);
    timerHours.textContent = addLeadingZero(newTime.hours);
    timerMinutes.textContent = addLeadingZero(newTime.minutes);
    timerSeconds.textContent = addLeadingZero(newTime.seconds);
  }, 1000);
}
function addLeadingZero(value) {
  return value.String().padStart(2, '0');
}

function convertMs(ms) {
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
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
