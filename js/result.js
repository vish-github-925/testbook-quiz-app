// DOM elements
const userNameTag = document.getElementById("user_name");
const totalTimeTakenTag = document.getElementById("total_time_taken");
const totalQuestionsTag = document.getElementById("total_questions");
const attemptedQuestionsTag = document.getElementById("attempted_questions");
const correctAnswersTag = document.getElementById("correct_answers");
const wrongAnswersTag = document.getElementById("wrong_answers");
const percentageOfSuccessTag = document.getElementById("percentage_of_success");

// localstorage
const userName = localStorage.getItem("quiz_user_name");
const totalTimeTaken = localStorage.getItem("quiz_total_time_taken");
const totalQuestions = localStorage.getItem("quiz_total_questions");
const correctAnswers = localStorage.getItem("quiz_correct_answers");
const wrongAnswers = localStorage.getItem("quiz_wrong_answers");
const percentageOfSuccess = localStorage.getItem("quiz_result_percentage");
const attemptedQuestions = localStorage.getItem("quiz_attempted_questions");

userNameTag.textContent = userName;
totalTimeTakenTag.textContent = totalTimeTaken;
attemptedQuestionsTag.textContent = attemptedQuestions;
totalQuestionsTag.textContent = totalQuestions;
correctAnswersTag.textContent = correctAnswers;
wrongAnswersTag.textContent = wrongAnswers;
percentageOfSuccessTag.textContent = percentageOfSuccess;
