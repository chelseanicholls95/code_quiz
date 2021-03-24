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

const startQuiz = () => {
  // removed intro div
  bodyElement.removeChild(introDivElement);

  // start timer
  startTimer();

  // create questions div
};

startQuizBtn.addEventListener("click", startQuiz);
