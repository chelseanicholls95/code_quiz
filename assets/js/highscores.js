const highScoresDiv = document.getElementById("scores-div");
const clearBtn = document.getElementById("clear-btn");

index = 0;

const getHighScores = () => {
  const highScores = localStorage.getItem("highScores");

  if (highScores) {
    return JSON.parse(highScores);
  } else {
    return [];
  }
};

const sortHighScores = (lowestScore, highestScore) =>
  highestScore.score - lowestScore.score;

const createTable = (highScores) => {
  const table = document.createElement("table");
  table.setAttribute("class", "table");
  table.setAttribute("id", "table");

  const createRow = (highScores) => {
    const row = table.insertRow(-1);
    row.setAttribute("class", "table-row");
    row.insertCell(-1).textContent = highScores.initials;
    row.insertCell(-1).textContent = highScores.score;
    index += 1;
  };

  highScores.forEach(createRow);

  highScoresDiv.appendChild(table);
};

const renderHighScoresTable = (highScores) => {
  if (highScores.length === 0) {
    highScoresDiv.textContent = "No high scores saved";
  } else {
    createTable(highScores);
  }
};

const clear = () => {
  localStorage.clear();
  highScoresDiv.removeChild(document.getElementById("table"));
  highScoresDiv.textContent = "No high scores saved";
};

const onLoad = () => {
  const highScores = getHighScores();
  const orderedHighScores = highScores.sort(sortHighScores);
  renderHighScoresTable(orderedHighScores);
};

clearBtn.addEventListener("click", clear);

window.addEventListener("load", onLoad);
