// querySelector ui elements
var questionElement = document.querySelector(".question");
var opntionsElement = document.querySelector(".options input");
var responceElement = document.querySelector(".responce");
var timerElement = document.querySelector(".timer-text");


//  vars
let currentPage = "start";
let winCounter = 0;
let loseCounter = 0;

let timer;
let timerCount;

// array of Questions and Answers
let questionText = ["This is a question who's solution is 3", "This is a question who's solution is 1", "This is a question who's solution is 4"]; 
let solution = [3, 1, 4];

//init function 
  // sets hidden properties
  //changePage(start);

//function changePage(page)
  //func takes parameter of new page and sets others to hidden
  //switch

//function displayResponce(bool) 
  //
  //displays if selection as Correct or incorrect

function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;

    // timerElement.textContent = timerCount;

    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      // sets changePage(end);
    }
  }, 1000);
}

// EVENT LISTENERS

// click Start

  //set timerCount
  //Start timer
  //changePage(1);

// click 1
  // check correct(page, 1);
