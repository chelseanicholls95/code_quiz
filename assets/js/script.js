const startQuizBtn = document.getElementById("start-btn");
const introDivElement = document.getElementById("intro-section");
const bodyElement = document.body;

const startQuiz = () => {
  // removed intro div
  bodyElement.removeChild(introDivElement);

  // start timer
};

startQuizBtn.addEventListener("click", startQuiz);
