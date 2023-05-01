import '../css/common.css';
const refs = {
bodyDoc: document.querySelector('body'),
buttonStart: document.querySelector('button[data-start]'),
buttonStop: document.querySelector('button[data-stop]'),}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`; }

// refs.buttonStop.disabled = true;
let intervalID = null;
refs.buttonStart.addEventListener('clisk', buttonStartAction);
function buttonStartAction() {
intervalID = setInterval(bgColor, 1000);
    function bgColor() {
      const randomHexColor = getRandomHexColor();
      refs.bodyDoc.style.backgroundColor = randomHexColor;
      refs.buttonStart.disabled = true;
    }
}
refs.buttonStop.addEventListener('click', buttonStopAction);
function buttonStopAction() {
  clearInterval(intervalID);
  refs.buttonStart.disabled = false; }
