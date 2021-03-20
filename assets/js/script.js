const timerSpanElement = document.getElementById("timer");
const startQuizBtn = document.getElementById("start-btn");
const introDivElement = document.getElementById("intro-section");
const bodyElement = document.body;
const scriptElement = document.getElementById("script");

let timerValue = 3;

const submitScore = (event) => {
  event.preventDefault();
  // get score

  // get initials from input

  // construct string

  // store in local storage

  // navigate to high scores page
  location.assign("../../highscores.html");
};

const createAndAppendForm = () => {
  // create elements for all html elements
  const sectionElement = document.createElement("section");
  const divElement = document.createElement("div");
  const h2Element = document.createElement("h2");
  const infoDivElement = document.createElement("div");
  const spanElement = document.createElement("span");
  const formElement = document.createElement("form");
  const inputElement = document.createElement("input");
  const submitScoreBtn = document.createElement("button");

  // set attributes for html elements
  sectionElement.setAttribute("class", "section");
  divElement.setAttribute("class", "section-div");
  h2Element.setAttribute("class", "titles");
  infoDivElement.setAttribute("class", "info");
  formElement.setAttribute("id", "score-form");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", "Enter your initials here");
  inputElement.setAttribute("id", "name-input");
  submitScoreBtn.setAttribute("class", "submit-btn");
  submitScoreBtn.setAttribute("id", "submit-btn");
  submitScoreBtn.setAttribute("type", "submit");

  // add content to html elements
  h2Element.textContent = "Game Over";
  infoDivElement.textContent = "Your score is: ";
  spanElement.textContent = "0";
  submitScoreBtn.textContent = "Submit";

  // add event listener to button
  formElement.addEventListener("submit", submitScore);

  // add html elements to the parent elements
  bodyElement.insertBefore(sectionElement, scriptElement);
  sectionElement.appendChild(divElement);
  divElement.appendChild(h2Element);
  divElement.appendChild(infoDivElement);
  infoDivElement.appendChild(spanElement);
  divElement.appendChild(formElement);
  formElement.appendChild(inputElement);
  formElement.appendChild(submitScoreBtn);
};

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

const startQuiz = () => {
  // removed intro div
  bodyElement.removeChild(introDivElement);
  // start timer
  startTimer();
};

startQuizBtn.addEventListener("click", startQuiz);
