const goBackBtn = document.getElementById("go-back-btn");
const clearBtn = document.getElementById("clear-btn");

const goBack = () => {
  location.href = "../../index.html";
};

const clear = () => {
  localStorage.clear();
};

const getFromLocalStorage = () => {
  const highScores = localStorage.getItem("highScores");

  if (highScores) {
    return highScores;
  } else {
    return [];
  }
};

renderHighScoresTable = (highScores) => {
  if (highScores.length === 0) {
    // empty
  } else {
    // create table 
};

const onLoad = () => {
  const highScores = getFromLocalStorage();
  renderHighScoresTable(highScores)
};

goBackBtn.addEventListener("click", goBack);
clearBtn.addEventListener("click", clear);

window.addEventListener("load", onLoad);
