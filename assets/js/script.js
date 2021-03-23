const bodyElement = document.body;
const timerSpanElement = document.getElementById("timer");
const startQuizBtn = document.getElementById("start-btn");
const introDivElement = document.getElementById("intro-section");
const scriptElement = document.getElementById("script");

let timerValue = 30;
let questionCounter = 0;
const questionsArray = [
  {
    question:
      "Which is the following tags are used to link an external JavaScript file to a HTML document?",
    choices: ["<link>", "<script>", "<a>", "<meta>"],
    answer: "<script>",
  },
  {
    question: "Which method is used to change a string into a number?",
    choices: [".toNumber()", ".parseInt()", ".valueOf()", ".parseFloat()"],
    answer: ".parseInt()",
  },
  {
    question: "What type of function gets hoisted?",
    choices: [
      "Function Declaration",
      "Function Expression",
      "Arrow Function",
      "All of the above",
    ],
    answer: "Function Declaration",
  },
  {
    question: "What data type does the confirm() function return?",
    choices: ["string", "undefined", "number", "boolean"],
    answer: "boolean",
  },
  {
    question: "What method is used to add items to an existing array?",
    choices: [".split()", ".pop()", ".push()", ".sort()"],
    answer: ".push()",
  },
];

const createAndAppendForm = () => {
  const submitScore = (event) => {
    event.preventDefault();
    // get score
    const score = timerValue;
    // get initials from input
    const initials = inputElement.value;
    // store in local storage
    localStorage.setItem(initials, score);
    // navigate to high scores page
    location.assign("../../highscores.html");
  };
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
  spanElement.textContent = timerValue;
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

const createAndAppendQuestionCards = (array) => {
  const checkAnswer = (event) => {
    // check whether chosen answer matches answer
    if (event.target.innerText === array.answer) {
      // set class of correct-answer
      event.target.setAttribute("class", "correct-answer");

      // show correct! underneath the question
      const correctDiv = document.createElement("div");
      const correct = document.createElement("div");

      correct.setAttribute("class", "correct");

      correct.textContent = "Correct!";

      questionDivElement.appendChild(correctDiv);
      correctDiv.appendChild(correct);

      // add 1 to the question counter
      questionCounter += 1;

      // remove current question
      bodyElement.removeChild(sectionElement);
    } else {
      // set class to wrong-answer
      event.target.setAttribute("class", "wrong-answer");

      // show wrong! underneath the question
      const wrongDiv = document.createElement("div");
      const wrong = document.createElement("div");

      wrong.setAttribute("class", "wrong");

      wrong.textContent = "Wrong!";

      questionDivElement.appendChild(wrongDiv);
      wrongDiv.appendChild(wrong);

      // minus time from the timer
      if (timerValue > 10) {
        timerValue -= 10;
      } else {
        timerValue = 0;
      }
    }
  };

  // create elements for all html elements
  const sectionElement = document.createElement("div");
  const questionDivElement = document.createElement("div");
  const h2Element = document.createElement("h2");
  const buttonDivElement = document.createElement("div");
  const buttonElement1 = document.createElement("button");
  const buttonElement2 = document.createElement("button");
  const buttonElement3 = document.createElement("button");
  const buttonElement4 = document.createElement("button");

  // set attributes for html elements
  sectionElement.setAttribute("class", "section");
  questionDivElement.setAttribute("class", "section-div");
  h2Element.setAttribute("class", "question");
  buttonDivElement.setAttribute("class", "button-div");
  buttonElement1.setAttribute("class", "choices");
  buttonElement2.setAttribute("class", "choices");
  buttonElement3.setAttribute("class", "choices");
  buttonElement4.setAttribute("class", "choices");

  // add content to html elements
  h2Element.textContent = array.question;
  buttonElement1.textContent = array.choices[0];
  buttonElement2.textContent = array.choices[1];
  buttonElement3.textContent = array.choices[2];
  buttonElement4.textContent = array.choices[3];

  // add event listener to button
  buttonElement1.addEventListener("click", checkAnswer);
  buttonElement2.addEventListener("click", checkAnswer);
  buttonElement3.addEventListener("click", checkAnswer);
  buttonElement4.addEventListener("click", checkAnswer);

  // add html elements to the parent elements
  bodyElement.appendChild(sectionElement);
  sectionElement.appendChild(questionDivElement);
  questionDivElement.appendChild(h2Element);
  questionDivElement.appendChild(buttonDivElement);
  buttonDivElement.appendChild(buttonElement1);
  buttonDivElement.appendChild(buttonElement2);
  buttonDivElement.appendChild(buttonElement3);
  buttonDivElement.appendChild(buttonElement4);
};

const startTimer = () => {
  const timerTick = () => {
    timerSpanElement.textContent = timerValue;
    timerValue -= 1;

    if (timerValue < 0 || questionCounter === questionsArray.length) {
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

  // create questions div
  questionsArray.forEach(createAndAppendQuestionCards);
};

startQuizBtn.addEventListener("click", startQuiz);
