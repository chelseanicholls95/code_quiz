const bodyElement = document.body;
const timerSpanElement = document.getElementById("timer");
const startQuizBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
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

const startTimer = () => {
  const timerTick = () => {
    timerSpanElement.textContent = timerValue;
    timerValue -= 1;

    if (timerValue < 0 || questionCounter === questionsArray.length) {
      clearInterval(timer);
    }
  };

  const timer = setInterval(timerTick, 1000);
};

createChoices = (choices) => {
  const parentDiv = document.createElement("div");

  createChoice = (choice) => {
    const divElement = document.createElement("div");

    const button = document.createElement("button");
    button.setAttribute("data-answer", choice);
    button.setAttribute("class", "choice-btn");
    button.textContent = choice;

    divElement.appendChild(button);

    parentDiv.appendChild(divElement);
  };
  choices.forEach(createChoice);

  return parentDiv;
};

createQuestion = (question) => {
  const divElement = document.createElement("div");
  divElement.setAttribute("id", "question-container");
  divElement.setAttribute("class", "section-div");
  divElement.setAttribute("data-answer", question.answer);

  const h2Element = document.createElement("h2");
  h2Element.setAttribute("class", "question");
  h2Element.textContent = question.question;

  const choices = createChoices(question.choices);

  divElement.append(h2Element, choices);

  return divElement;
};

const startQuiz = () => {
  // removed intro div
  quizContainer.removeChild(introDivElement);

  // start timer
  startTimer();

  // create questions div
  const question = createQuestion(questionsArray[0]);

  quizContainer.appendChild(question);
};

startQuizBtn.addEventListener("click", startQuiz);
