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

const onLoad = () => {
  const highScores = getFromLocalStorage();
};

goBackBtn.addEventListener("click", goBack);
clearBtn.addEventListener("click", clear);

window.addEventListener("load", onLoad);
