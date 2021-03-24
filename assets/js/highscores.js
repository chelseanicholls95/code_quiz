const clearBtn = document.getElementById("clear-btn");

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
  }
};

const onLoad = () => {
  const highScores = getFromLocalStorage();
  renderHighScoresTable(highScores);
};

clearBtn.addEventListener("click", clear);

window.addEventListener("load", onLoad);
