import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formElement = document.querySelector('.form');
let delayInp = document.querySelector('input[name="delay"]');
let stepInp = document.querySelector('input[name="step"]');
let amountInp = document.querySelector('input[name="amount"]');

formElement.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();
  let timeDelay = Number(delayInp.value);
  // let timeAmount = Number(amountInp.value);
  for (let i = 1; i <= Number(amountInp.value); i += 1) {
    createPromise(i, timeDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    timeDelay += Number(stepInp.value);
  }
  e.currentTarget.reset();
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
