import '../css/common.css';
const bodyDoc = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
buttonStop.disabled = true;
let intervalID = null;
buttonStart.addEventListener('clisk', buttonStartAction);
function buttonStartAction() {
  intervalID = setInterval(bgColor, 1000);
  function bgColor() {
    bodyDoc.style.backgroundColor = getRandomHexColor();
    buttonStart.disabled = true;
  }
}
buttonStop.addEventListener('click', buttonStopAction);
function buttonStopAction() {
  clearInterval(intervalID);
  buttonStart.disabled = false;
}
