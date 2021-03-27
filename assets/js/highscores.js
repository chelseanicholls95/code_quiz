const highScoresDiv = document.getElementById("scores-div");
const clearBtn = document.getElementById("clear-btn");

index = 0;

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

// sort scores highest to lowest
const sortHighScores = (lowestScore, highestScore) =>
  highestScore.score - lowestScore.score;

const createTable = (highScores) => {
  const createRow = (highScore) => {
    // create row, set attributes and text content
    const row = table.insertRow(-1);
    row.setAttribute("class", "table-row");
    row.insertCell(-1).textContent = highScore.initials;
    row.insertCell(-1).textContent = highScore.score;
    index += 1;
  };
  // create table and set attributes
  const table = document.createElement("table");
  table.setAttribute("class", "table");
  table.setAttribute("id", "table");

  highScores.forEach(createRow);

  // append table to high scores div
  highScoresDiv.appendChild(table);
};

const renderHighScoresTable = (highScores) => {
  // if high scores has no content - show 'no high scores saved', otherwise create high scores table
  if (highScores.length === 0) {
    highScoresDiv.textContent = "No high scores saved";
  } else {
    createTable(highScores);
  }
};

const clear = () => {
  // clear local storage, remove table and show 'no high scores saved'
  localStorage.clear();
  highScoresDiv.removeChild(document.getElementById("table"));
  highScoresDiv.textContent = "No high scores saved";
};

const onLoad = () => {
  // get high scores, sort them and render high scores table
  const highScores = getHighScores();
  const orderedHighScores = highScores.sort(sortHighScores);
  renderHighScoresTable(orderedHighScores);
};

clearBtn.addEventListener("click", clear);
window.addEventListener("load", onLoad);
