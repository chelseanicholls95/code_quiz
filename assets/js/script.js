const timerSpanElement = document.getElementById("timer");
const startQuizBtn = document.getElementById("start-btn");
const introDivElement = document.getElementById("intro-section");
const bodyElement = document.body;

let timerValue = 3;

const startTimer = () => {
  const timerTick = () => {
    timerSpanElement.textContent = timerValue;
    timerValue -= 1;

    if (timerValue < 0) {
      clearInterval(timer);
      createAndAppendForm();
    }
  };

  const timer = setInterval(timerTick, 1000);
};

const createAndAppendForm = () => {
  const sectionElement = document.createElement("section");
  const divElement = document.createElement("div");
  const h2Element = document.createElement("h2");
  const infoDivElement = document.createElement("div");
  const spanElement = document.createElement("span");
  const formElement = document.createElement("form");
  const inputElement = document.createElement("input");
  const submitBtn = document.createElement("button");

  sectionElement.setAttribute("class", "section");
  divElement.setAttribute("class", "section-div");
  h2Element.setAttribute("class", "titles");
  infoDivElement.setAttribute("class", "info");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", "Enter your initials here");
  submitBtn.setAttribute("class", "submit-btn");

  h2Element.textContent = "Game Over";
  infoDivElement.textContent = "Your score is: ";
  spanElement.textContent = "0";
  submitBtn.textContent = "Submit";

  bodyElement.appendChild(sectionElement);
  sectionElement.appendChild(divElement);
  divElement.appendChild(h2Element);
  divElement.appendChild(infoDivElement);
  infoDivElement.appendChild(spanElement);
  divElement.appendChild(formElement);
  formElement.appendChild(inputElement);
  formElement.appendChild(submitBtn);
};

const startQuiz = () => {
  // removed intro div
  bodyElement.removeChild(introDivElement);
  // start timer
  startTimer();
};

startQuizBtn.addEventListener("click", startQuiz);
