const timerSpanElement = document.getElementById("timer");
const startQuizBtn = document.getElementById("start-btn");
const introDivElement = document.getElementById("intro-section");
const bodyElement = document.body;

let timerValue = 10;

const startTimer = () => {
  const timerTick = () => {
    timerSpanElement.textContent = timerValue;
    timerValue -= 1;

    if (timerValue < 0) {
      clearInterval(timer);
    }
  };

  const timer = setInterval(timerTick, 1000);
};

const startQuiz = () => {
  // removed intro div
  bodyElement.removeChild(introDivElement);
  // start timer
  startTimer();
};

startQuizBtn.addEventListener("click", startQuiz);
