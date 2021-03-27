const bodyElement = document.body;
const timerSpanElement = document.getElementById("timer");
const startQuizBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const introDivElement = document.getElementById("intro-section");
const scriptElement = document.getElementById("script");

let timerValue = 60;
let index = 0;

const questionsArray = [
  {
    question:
      "Which of the following tags are used to link an external JavaScript file to a HTML document?",
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

const getHighScores = () => {
  // get high scores from local storage
  const highScores = localStorage.getItem("highScores");

  // if there is high scores data saved in local storage - convert the string to an object and return. If no data - return empty array
  if (highScores) {
    return JSON.parse(highScores);
  } else {
    return [];
  }
};

const submitScore = (event) => {
  event.preventDefault();

  // get button event
  const target = event.target;

  // if button is clicked
  if (target.matches("button")) {
    const score = timerValue;
    const initials = document.getElementById("name-input").value;

    // if initials input is not empty, add initials and score to an array, set to local storage
    if (initials !== "") {
      const highScore = {
        initials: initials,
        score: score,
      };
      const highScores = getHighScores();
      highScores.push(highScore);
      localStorage.setItem("highScores", JSON.stringify(highScores));
    }
    // go to high scores page
    location.href =
      "https://chelseanicholls95.github.io/code_quiz/highscores.html";
  }
};

const createAndAppendForm = () => {
  // create and append div
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "section-div");
  quizContainer.appendChild(divElement);

  // create and append h2
  const h2Element = document.createElement("h2");
  h2Element.setAttribute("class", "title");
  h2Element.textContent = "Game Over";
  divElement.appendChild(h2Element);

  // create and append info div
  const infoDivElement = document.createElement("div");
  infoDivElement.setAttribute("class", "info");
  infoDivElement.textContent = "Your score is: ";
  divElement.appendChild(infoDivElement);

  // create and append span to show score
  const spanElement = document.createElement("span");
  spanElement.textContent = timerValue;
  infoDivElement.appendChild(spanElement);

  // create and append form
  const formElement = document.createElement("form");
  formElement.setAttribute("id", "score-form");
  formElement.addEventListener("click", submitScore);
  divElement.appendChild(formElement);

  // create and append initials input
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", "Enter your initials here");
  inputElement.setAttribute("id", "name-input");
  formElement.appendChild(inputElement);

  // create and append submit button
  const submitScoreBtn = document.createElement("button");
  submitScoreBtn.setAttribute("class", "btn submit-btn");
  submitScoreBtn.setAttribute("id", "submit-btn");
  submitScoreBtn.setAttribute("type", "submit");
  submitScoreBtn.textContent = "Submit";
  formElement.appendChild(submitScoreBtn);
};

const showGameOverContainer = () => {
  // remove quiz container and create form
  quizContainer.removeChild(document.getElementById("question-container"));
  createAndAppendForm();
};

const startTimer = () => {
  // set timer to starting value
  timerSpanElement.textContent = timerValue;

  const timerTick = () => {
    // remove one from the timer and set to timer
    timerValue -= 1;
    timerSpanElement.textContent = timerValue;

    // if the timer is less than or equal to 0 - set to 0 and show game over container
    if (timerValue <= 0) {
      timerValue = 0;
      timerSpanElement.textContent = timerValue;
      clearInterval(timer);
      showGameOverContainer();
    }

    // if all questions in the array have been shown - stop timer and show game over container
    if (index === questionsArray.length) {
      clearInterval(timer);
      showGameOverContainer();
      timerSpanElement.textContent = timerValue;
    }
  };

  const timer = setInterval(timerTick, 1000);
};

const createAndAppendChoices = (choices) => {
  const parentDiv = document.createElement("div");

  createChoice = (choice) => {
    // create div and button
    const divElement = document.createElement("div");
    const button = document.createElement("button");

    // set attributes and text content
    button.setAttribute("data-answer", choice);
    button.setAttribute("class", "btn choice-btn");
    button.textContent = choice;

    // append
    divElement.appendChild(button);
    parentDiv.appendChild(divElement);
  };

  choices.forEach(createChoice);
  return parentDiv;
};

const createQuestion = (question) => {
  // create div and set attributes
  const divElement = document.createElement("div");
  divElement.setAttribute("id", "question-container");
  divElement.setAttribute("class", "section-div");
  divElement.setAttribute("data-answer", question.answer);

  // create h2 and set attributes
  const h2Element = document.createElement("h2");
  h2Element.setAttribute("class", "question");
  h2Element.textContent = question.question;

  // create choice buttons
  const choices = createAndAppendChoices(question.choices);

  // add event listener to div
  divElement.addEventListener("click", checkAnswer);

  // append h2 and choices to div
  divElement.append(h2Element, choices);

  return divElement;
};

const renderQuestion = (question) => {
  // if there are questions left in the questions array - create a question card and append to the quiz container
  if (index < questionsArray.length) {
    const questionContainer = createQuestion(question);
    quizContainer.appendChild(questionContainer);
  }
};

const replaceQuestion = () => {
  // target question container
  const questionContainer = document.getElementById("question-container");

  // if there are questions left in the questions array - remove current question container and render the next
  if (index < questionsArray.length) {
    quizContainer.removeChild(questionContainer);
    renderQuestion(questionsArray[index]);
  }
};

const checkAnswer = (event) => {
  // get the button that was clicked and the div
  const target = event.target;
  const currentTarget = event.currentTarget;

  // if the element that was clicked is a button - get users answer and correct answer
  if (target.matches("button")) {
    const answer = target.dataset.answer;
    const correctAnswer = currentTarget.getAttribute("data-answer");

    // if the users answer is correct - replace question with next question
    if (answer === correctAnswer) {
      // increase index by 1 and set class to 'correct-answer'
      index += 1;
      target.setAttribute("class", "correct-answer");

      // remove previous div
      if (document.getElementById("wrong")) {
        currentTarget.removeChild(document.getElementById("wrong"));
      }

      // create div for text underneath choices
      const correct = document.createElement("div");
      correct.setAttribute("class", "correct");
      correct.textContent = "Correct!";
      currentTarget.appendChild(correct);

      // time out of half a second to show correct text
      setTimeout(replaceQuestion, 500);
    } else {
      // set class of 'wrong-answer'
      target.setAttribute("class", "wrong-answer");

      // remove previous div
      if (document.getElementById("wrong")) {
        currentTarget.removeChild(document.getElementById("wrong"));
      }
      // create div for text underneath choices
      const wrong = document.createElement("div");
      wrong.setAttribute("class", "wrong");
      wrong.setAttribute("id", "wrong");
      wrong.textContent = "Wrong!";
      currentTarget.appendChild(wrong);

      // reduce timer by 10 seconds if the remaining time is greater than 10 - if below, go straight to 0
      if (timerValue >= 10) {
        timerValue -= 10;
      } else {
        timerValue = 0;
      }
    }
  }
};

const startQuiz = () => {
  // remove intro div
  quizContainer.removeChild(introDivElement);

  // start timer
  startTimer();

  // create question div
  renderQuestion(questionsArray[index]);
};

startQuizBtn.addEventListener("click", startQuiz);
