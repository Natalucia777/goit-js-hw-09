import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addLeadingZero } from './addLeadingZero';
import { convertMs } from './convertMs';

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
  intervalID = setInterval(activateTimer, 1000);
}
const optionsDate = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      buttonStart.disabled = true;
      return Notify.failure('Please choose a date in the future');
    }
    buttonStart.disabled = false;
  },
});
function activateTimer() {
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
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
