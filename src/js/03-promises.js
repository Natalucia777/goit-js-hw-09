import Notiflix from 'notiflix';
const formElement = document.querySelector('.form');

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });



function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  
  

  if (shouldResolve) {
    // Fulfill

    

  } else {
    // Reject



  }
}
