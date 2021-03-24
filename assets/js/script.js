const bodyElement = document.body;
const timerSpanElement = document.getElementById("timer");
const startQuizBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const introDivElement = document.getElementById("intro-section");
const scriptElement = document.getElementById("script");

let timerValue = 30;
let index = 0;

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
const highScores = [];

const submitScore = (event) => {
  event.preventDefault();

  const target = event.target;

  if (target.matches("button")) {
    const score = timerValue;
    const initials = document.getElementById("name-input").value;

    if (initials !== "") {
      const highScore = {
        initials: initials,
        score: score,
      };

      const finalScore = JSON.stringify(highScore);
      highScores.push(finalScore);

      localStorage.setItem("highScores", highScores);
    }

    // location.href = "../../highscores.html";
  }
};

const createAndAppendForm = () => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "section-div");
  quizContainer.appendChild(divElement);

  const h2Element = document.createElement("h2");
  h2Element.setAttribute("class", "title");
  h2Element.textContent = "Game Over";
  divElement.appendChild(h2Element);

  const infoDivElement = document.createElement("div");
  infoDivElement.setAttribute("class", "info");
  infoDivElement.textContent = "Your score is: ";
  divElement.appendChild(infoDivElement);

  const spanElement = document.createElement("span");
  spanElement.textContent = timerValue;
  infoDivElement.appendChild(spanElement);

  const formElement = document.createElement("form");
  formElement.setAttribute("id", "score-form");
  formElement.addEventListener("click", submitScore);
  divElement.appendChild(formElement);

  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", "Enter your initials here");
  inputElement.setAttribute("id", "name-input");
  formElement.appendChild(inputElement);

  const submitScoreBtn = document.createElement("button");
  submitScoreBtn.setAttribute("class", "submit-btn");
  submitScoreBtn.setAttribute("id", "submit-btn");
  submitScoreBtn.setAttribute("type", "submit");
  submitScoreBtn.textContent = "Submit";
  formElement.appendChild(submitScoreBtn);
};

const startTimer = () => {
  const timerTick = () => {
    timerSpanElement.textContent = timerValue;
    timerValue -= 1;

    if (timerValue < 0 || index === questionsArray.length) {
      clearInterval(timer);
      quizContainer.removeChild(document.getElementById("question-container"));
      createAndAppendForm();
    }
  };

  const timer = setInterval(timerTick, 1000);
};

const createAndAppendChoices = (choices) => {
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

const createQuestion = (question) => {
  const divElement = document.createElement("div");
  divElement.setAttribute("id", "question-container");
  divElement.setAttribute("class", "section-div");
  divElement.setAttribute("data-answer", question.answer);

  const h2Element = document.createElement("h2");
  h2Element.setAttribute("class", "question");
  h2Element.textContent = question.question;

  const choices = createAndAppendChoices(question.choices);

  divElement.addEventListener("click", checkAnswer);

  divElement.append(h2Element, choices);

  return divElement;
};

const renderQuestion = (question) => {
  if (index < questionsArray.length) {
    const questionContainer = createQuestion(question);

    quizContainer.appendChild(questionContainer);
  }
};

const checkAnswer = (event) => {
  const target = event.target;
  const currentTarget = event.currentTarget;

  if (target.matches("button")) {
    const answer = target.dataset.answer;

    const correctAnswer = currentTarget.getAttribute("data-answer");

    if (answer === correctAnswer) {
      const replaceQuestion = () => {
        const questionContainer = document.getElementById("question-container");
        if (index < questionsArray.length) {
          quizContainer.removeChild(questionContainer);

          renderQuestion(questionsArray[index]);
        }
      };

      index += 1;

      target.setAttribute("class", "correct-answer");

      const correct = document.createElement("div");
      correct.setAttribute("class", "correct");
      correct.textContent = "Correct!";
      currentTarget.appendChild(correct);

      setTimeout(replaceQuestion, 500);
    } else {
      target.setAttribute("class", "wrong-answer");

      const wrong = document.createElement("div");
      wrong.setAttribute("class", "wrong");
      wrong.textContent = "Wrong!";
      currentTarget.appendChild(wrong);

      if (timerValue > 10) {
        timerValue -= 10;
      } else {
        timerValue = 0;
      }
    }
  }
};

const startQuiz = () => {
  // removed intro div
  quizContainer.removeChild(introDivElement);

  // start timer
  startTimer();

  // create questions div
  renderQuestion(questionsArray[index]);
};

startQuizBtn.addEventListener("click", startQuiz);
