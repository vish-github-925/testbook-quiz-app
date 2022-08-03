// localstorage items
const categoryName = localStorage.getItem("quiz_category");
const userName = localStorage.getItem("quiz_user_name");

// DOM elements
const containerTag = document.querySelector(".container");
const rulesContainerTag = document.querySelector(".rules_container");
const loadingContainerTag = document.querySelector(".loading_container");
const categoryNameTag = document.querySelector(".category_name");
const timerTag = document.querySelector(".timer");
const scoreTag = document.querySelector(".score");
const questionTag = document.querySelector(".question");
const questionNoInfoTag = document.querySelector(".question_no_info");
const userNameTag = document.querySelector(".user_name");
const opt1Tag = document.querySelector(".opt1");
const opt2Tag = document.querySelector(".opt2");
const opt3Tag = document.querySelector(".opt3");
const opt4Tag = document.querySelector(".opt4");
const nextQuestion = document.querySelector(".next_question");
const backButton = document.querySelector(".rules_buttons .back");
const continueButton = document.querySelector(".rules_buttons .continue");
let totalTimeTaken = 0;

let selectedCategory;
let questionIndex = 0;
let score = 0;
let attempted_questions = 0;
let correct_answers = 0;
let wrong_answers = 0;
let selectedAnswer = "";
let time = 10;
let questionTimer;
let totalQuestions;
let option;

categoryNameTag.textContent = categoryName;
userNameTag.textContent = userName;

// rules buttons event listener
function getQuizQuestions(option) {
  fetch(`https://secure-basin-25900.herokuapp.com/${option}`)
    .then((res) => res.json())
    .then((data) => {
      selectedCategory = data;
      totalQuestions = selectedCategory.length;
      attempted_questions = totalQuestions;
      containerTag.classList.remove("hidden");
      loadingContainerTag.classList.add("hidden");
      updateData();
      counter();
    })
    .catch((err) => console.log(err));
}
function loadingState() {
  if (!selectedCategory) {
    containerTag.classList.add("hidden");
    loadingContainerTag.classList.remove("hidden");
  }
}
continueButton.addEventListener("click", () => {
  containerTag.classList.remove("hidden");
  rulesContainerTag.classList.add("hidden");
  if (categoryName.toUpperCase() === "PROBABILITY") {
    option = "probability";
    loadingState();
    getQuizQuestions(option);
  } else if (categoryName.toUpperCase() === "PIPES AND CISTERNS") {
    option = "pipesandcisterns";
    loadingState();
    getQuizQuestions(option);
  } else if (categoryName.toUpperCase() === "PROBLEMS ON AGES") {
    option = "problemsonages";
    loadingState();
    getQuizQuestions(option);
  } else {
    option = "profitsandlosses";
    loadingState();
    getQuizQuestions(option);
  }

  // first time view
});
backButton.addEventListener("click", () => {
  containerTag.classList.add("hidden");
  rulesContainerTag.classList.remove("hidden");
  location.replace("../index.html");
});

function updateData() {
  questionNoInfoTag.textContent = `${questionIndex + 1}/${totalQuestions}`;
  questionTag.textContent = selectedCategory[questionIndex].question;
  opt1Tag.textContent = selectedCategory[questionIndex].options.a;
  opt2Tag.textContent = selectedCategory[questionIndex].options.b;
  opt3Tag.textContent = selectedCategory[questionIndex].options.c;
  opt4Tag.textContent = selectedCategory[questionIndex].options.d;
  scoreTag.textContent = score;
}

function updateLocalStorage() {
  const percentageOfResult = (correct_answers / totalQuestions) * 100;
  localStorage.setItem("quiz_correct_answers", correct_answers);
  localStorage.setItem("quiz_wrong_answers", wrong_answers);
  localStorage.setItem("quiz_total_questions", totalQuestions);
  localStorage.setItem("quiz_result_percentage", percentageOfResult);
  localStorage.setItem("quiz_attempted_questions", attempted_questions);
  localStorage.setItem("quiz_total_time_taken", totalTimeTaken);
  location.replace("../html/result.html");
}

const timerFunction = () => {
  if (questionIndex == 10) {
    updateLocalStorage();
    clearInterval(questionTimer);
  }
  if (time < 1) {
    totalTimeTaken = totalTimeTaken + (10 - time);
    time = 10;
    questionIndex++;
    if (selectedAnswer === "") {
      attempted_questions--;
    }
    try {
      updateData();
    } catch (err) {
      console.log(err);
    }
  }
  if (time < 6) {
    timerTag.style.color = "red";
    timerTag.style.transform = "scale(1.5)";
  } else {
    timerTag.style.color = "black";
    timerTag.style.transform = "scale(1)";
  }

  timerTag.textContent = time;
  time--;
};
// window timer
function counter() {
  questionTimer = setInterval(timerFunction, 1000);
}

const totalOptions = [opt1Tag, opt2Tag, opt3Tag, opt4Tag];

const OptionsReset = (args) => {
  args.forEach((ele) => {
    ele.style.color = "black";
    ele.style.backgroundColor = "white";
    ele.style.borderColor = "#0ad0f4";
  });
};

const checkCorrectAnswer = (arg) => {
  selectedAnswer = arg.textContent;

  totalOptions.forEach((ele) => {
    if (ele.textContent == selectedCategory[questionIndex].answer) {
      ele.style.color = "#306844";
      ele.style.backgroundColor = "#EDFEAD";
      ele.style.borderColor = "lightgreen";
    } else if (arg === ele) {
      ele.style.color = "#D83A56";
      ele.style.backgroundColor = "#FAF2DA";
      ele.style.borderColor = "pink";
    }
  });
};

// options event listener
opt1Tag.addEventListener("click", function () {
  clearInterval(questionTimer);
  checkCorrectAnswer(this);
});
opt2Tag.addEventListener("click", function () {
  clearInterval(questionTimer);
  checkCorrectAnswer(this);
});
opt3Tag.addEventListener("click", function () {
  clearInterval(questionTimer);
  checkCorrectAnswer(this);
});
opt4Tag.addEventListener("click", function () {
  clearInterval(questionTimer);
  checkCorrectAnswer(this);
});

nextQuestion.addEventListener("click", () => {
  totalTimeTaken = totalTimeTaken + (10 - time);
  OptionsReset(totalOptions);
  if (selectedAnswer === "") {
    attempted_questions--;
  }
  timerTag.textContent = 10;
  timerTag.style.color = "black";
  timerTag.style.transform = "scale(1)";
  time = 10;
  clearInterval(questionTimer);
  counter();
  if (selectedAnswer === selectedCategory[questionIndex].answer) {
    correct_answers++;
    score++;
  } else {
    wrong_answers++;
  }
  questionIndex++;
  if (questionIndex > 9) {
    updateLocalStorage();
  }
  try {
    updateData();
  } catch (err) {
    console.log(err);
  }
});
