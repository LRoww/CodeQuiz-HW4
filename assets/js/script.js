// querySelector ui elements
let questionEl = document.querySelector(".question");
let optionsEl = document.querySelector(".options");
let responceEl = document.querySelector(".responce");
let timerEl = document.querySelector(".timer-text");
let scoreEl = document.querySelector(".scores-ol");

//pages
let startPage = document.querySelector(".start-page");
let questionPage = document.querySelector(".question-page");
let endPage = document.querySelector(".end-page");
let highscorePage = document.querySelector(".highscores-page");

//buttons
let startButton = document.querySelector(".start-button");
let button0 = document.querySelector(".b0");
let button1 = document.querySelector('.b1');
let button2 = document.querySelector('.b2');
let button3 = document.querySelector('.b3');
let submitButton = document.querySelector(".submit");

//input
let initialEl = document.querySelector('#initials');

//  vars
let winCounter = 0;
let userScores = {};

let timer;
let timerCount;

// array of Questions and Answers
let arrayIndex = 0;
let questionText = ["This is a question who's solution is 3", "This is a question who's solution is 1", "This is a question who's solution is 4"]; 
let answerText = [["answer1", "answer2", "answer3", "answer4"], ["answer1", "answer2", "answer3", "answer4"], ["answer1", "answer2", "answer3", "answer4"]];
let solution = [2, 0, 3];


function startQuiz(event){
  //set timerCount
  timerCount = 15;
  //Start timer
  startTimer();
  changePage('start', 0);
}

function setQuestion(page){
  questionEl.textContent = questionText[page];
  let answerset = answerText[page];
  console.log(answerset);

  for (let i = 0; i <= answerText.length; i++){
    console.log(optionsEl.children[i]);
    optionsEl.children[i].textContent = answerset[i];
  }
}

function changePage(page1, page2){
  //func takes parameter of new page and sets others to hidden
  console.log("changePage called");
  if (typeof page2 === "number") {
    arrayIndex = page2;
  }
  console.log(arrayIndex);
  //switch
  switch(page1) {
    case 'start':
      startPage.setAttribute('hidden', "");
      break;
    case 2:
      questionPage.setAttribute('hidden', "");
      break;
    case 'end':
      endPage.setAttribute('hidden', "");
      break;
    case 'score':
      highscorePage.setAttribute('hidden', "");  
  }

  switch(page2) {
    case 'start':
      startPage.removeAttribute('hidden');
      break;
    case 'end':
      endPage.removeAttribute('hidden');
      clearInterval(timer);
      break;
    case 'score':
      highscorePage.removeAttribute('hidden');
      displayScores();
      break;
    default:
      questionPage.removeAttribute('hidden');
      setQuestion(page2);
  }
}

function displayResponce(correct) {
  //displays if selection as Correct or incorrect
  if (correct === true){
    responceEl.textContent = "Correct!";
  } else {
    responceEl.textContent = "Incorrect";
  }
}

function startTimer() {
  // Sets timer
  timer = setInterval(function() {

    timerEl.textContent = "Time: " + timerCount;
    timerCount--;

    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      changePage(2, "end");
    }
  }, 1000);
}

function checkCorrect(event) {
  let clicked = event.target.className;
  clicked = parseInt(clicked[1]);
  console.log(clicked);
  
  if (clicked === solution[arrayIndex]) {
    //display Correct!
    displayResponce(true);
    //Change Score
    winCounter++;
    console.log("Correct!");
  } else {
    timerCount = timerCount - 5;
    //Display Incorect
    displayResponce(false);
    //Change score
  }
  if (arrayIndex < 2){
    changePage(arrayIndex, arrayIndex + 1);
  } else {
    changePage(2, "end");
  }
}

function submitInitals(event) {
  let userInitals = initialEl.value; 

  if (localStorage.getItem("Scores") === null){
    userScores = Object.create( {} );
  } else {
    userScores = JSON.parse(localStorage.getItem("Scores"));
  }

  Object.defineProperty(userScores, userInitals, {
    value: winCounter,
    writable: true,
    enumerable: true,
    configurable: true
  });
  localStorage.setItem('Scores', JSON.stringify(userScores));
  changePage('end','score');
}

function createEntries(v,k) {
  let e = [];
  for (let i=0; i < v.length; i++){
    e.push([k[i], v[i]]);
  }
  return e;
}

function displayScores(){
  //take initals and scores and sort them
  //sortScores();
  let values = Object.values(userScores);
  let keys = Object.keys(userScores);
  
  let entries = createEntries(values, keys);

  entries = entries.sort(function(a, b) {
    return b[1] - a[1];
  });

  for (let i = 0; i < values.length; i++){
    let li = document.createElement("li");
    li.textContent = entries[i][0] + ": " + entries[i][1];
    scoreEl.appendChild(li);
  }
  // scoreEl add li element
  //add data to li element
}



// EVENT LISTENERS
startButton.addEventListener('click', startQuiz);
button0.addEventListener('click', checkCorrect);
button1.addEventListener('click', checkCorrect);
button2.addEventListener('click', checkCorrect);
button3.addEventListener('click', checkCorrect);
submitButton.addEventListener('click', submitInitals);
