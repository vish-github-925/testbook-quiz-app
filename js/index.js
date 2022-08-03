const userInput = document.querySelector("#user_name");
const formSubmit = document.querySelector("#form_submit");
const resetCategory = document.querySelector("#reset_category");
const pipesAndCisterns = document.querySelector("#pc");
const probability = document.querySelector("#pb");
const problemsOnAges = document.querySelector("#pa");
const profitsAndLosses = document.querySelector("#pl");

const totalCategories = [
  probability,
  pipesAndCisterns,
  problemsOnAges,
  profitsAndLosses,
];
let userName;
let selectedCategory = "";
let unselectedCategoriesItems;

const unselectedCategories = (ele) => {
  const uc = totalCategories.filter((category) => {
    if (category != ele) {
      return category;
    }
  });
  return uc;
};
const categoryReset = (args) => {
  args.forEach((ele) => {
    ele.style.color = "white";
    ele.style.backgroundColor = "black";
  });
};
const selectCategory = (arg) => {
  selectedCategory = arg.textContent;
  arg.style.color = "black";
  arg.style.backgroundColor = "white";
};
// probability event listeners
probability.addEventListener("click", function () {
  selectCategory(this);
  unselectedCategoriesItems = unselectedCategories(this);
  categoryReset(unselectedCategoriesItems);
});

// pipesAndCisterns event listeners
pipesAndCisterns.addEventListener("click", function () {
  selectCategory(this);
  unselectedCategoriesItems = unselectedCategories(this);
  categoryReset(unselectedCategoriesItems);
});

// problemsOnAges event listeners
problemsOnAges.addEventListener("click", function () {
  selectCategory(this);
  unselectedCategoriesItems = unselectedCategories(this);
  categoryReset(unselectedCategoriesItems);
});

// profitsAndLosses event listeners
profitsAndLosses.addEventListener("click", function () {
  selectCategory(this);
  unselectedCategoriesItems = unselectedCategories(this);
  categoryReset(unselectedCategoriesItems);
});

resetCategory.addEventListener("click", function () {
  selectedCategory = "";
  categoryReset(totalCategories);
});
formSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  userName = userInput.value;
  if (userName === "") {
    alert("Please Enter Username");
  }
  if (selectedCategory === "") {
    alert("Please select any one of the category!");
  }
  if (userName && selectedCategory) {
    location.replace("./html/quiz.html");
    localStorage.setItem("quiz_user_name", userName);
    localStorage.setItem("quiz_category", selectedCategory);
  }
});
