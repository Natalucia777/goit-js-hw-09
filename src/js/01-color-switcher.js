import '../css/common.css';

const refs = {
  bodyDoc: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};
let intervalID = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
refs.buttonStart.addEventListener('click', () => {
  intervalID = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.bodyDoc.style.backgroundColor = randomColor;
    refs.buttonStart.disabled = true;
  }, 1000);
});
refs.buttonStop.addEventListener('click', () => {
  clearInterval(intervalID);
  refs.buttonStart.disabled = false;
});
