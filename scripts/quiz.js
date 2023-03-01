let questions = new Map([
  [
    1,
    [
      ["What is an example of dynamic binding ?", "C. Method overriding"],
      [
        "A. Any method",
        "B. Method overloading",
        "C. Method overriding",
        "D. Compiling",
      ],
    ],
  ],
  [
    2,
    [
      [
        "What is encapsulation ?",
        "B. Hiding the data and implementation details within a class",
      ],
      [
        "A. Defining classes by focusing on what is important for a purpose",
        "B. Hiding the data and implementation details within a class",
        "C. Making all methods private",
        "D. Using words to define classes",
      ],
    ],
  ],
  [
    3,
    [
      [
        "What are the five Creational Design patterns by the Gang of Four ?",
        "D. Abstract Factory, Builder, Factory Method, Prototype, and Singleton.",
      ],
      [
        "A. Observer, State, Strategy, Template Method, and Visitor.",
        "B. Composite, Visitor, State, Prototype, and Singleton.",
        "C. Composite, Builder, Factory Method, Prototype, and Singleton.",
        "D. Abstract Factory, Builder, Factory Method, Prototype, and Singleton.",
      ],
    ],
  ],
  [
    4,
    [
      [
        "Methods and attributes that define an object are a kind of blueprint called what ?",
        "C. A class",
      ],
      ["A. A collection", "B. A variable", "C. A class", "D. A procedure"],
    ],
  ],
  [
    5,
    [
      [
        "Which of these is not a basic principle of Object Oriented Programming ?",
        "B. Compilation",
      ],
      [
        "A. Encapsulation",
        "B. Compilation",
        "C. Inheritance",
        "D. Polymorphism",
      ],
    ],
  ],
  [
    6,
    [
      [
        "If a local class is defined in a function, what is true for an object of that class ?",
        "A. The object can be accessed, declared, and used locally in that function.",
      ],
      [
        "A. The object can be accessed, declared, and used locally in that function.",
        "B. The object must be declared inside any other function.",
        "C. The object is temporarily accessible outside the function.",
        "D. The object can call all the other class members anywhere in the program.",
      ],
    ],
  ],
  [
    7,
    [
      [
        "When is a constructor executed?",
        "D. When an object is created from a class",
      ],
      [
        "A. When an class is defined using the class keyword",
        "B. Every time an object is referenced",
        "C. When an object is created from a class using the create keyword",
        "D. When an object is created from a class",
      ],
    ],
  ],
  [
    8,
    [
      [
        "Which of the following is NOT an advantage of using getters and setters ?",
        "A. Getters and setters can speed up compilation.",
      ],
      [
        "A. Getters and setters can speed up compilation.",
        "B. Getters and setters provide encapsulation of behavior.",
        "C. Getters and setters provide a debugging point for when a property changes at runtime.",
        "D. Getters and setters permit different access levels.",
      ],
    ],
  ],
  [
    9,
    [
      [
        "Which of these keywords are access specifiers ?",
        "B. Public and private",
      ],
      [
        "A. Abstract and public",
        "B. Public and private",
        "C. This and final",
        "D. Final and abstract",
      ],
    ],
  ],
  [
    10,
    [
      [
        "An instance of which type of class cannot be created ?",
        "C. Abstract class",
      ],
      [
        "A. Protected class",
        "B. Base class",
        "C. Abstract class",
        "D. Anonymous class",
      ],
    ],
  ],
]);
let score = new Map();
let totalScore = 0;
let currentQuestionNumber = 1;
let totalNumberOfQuestions = questions.size;
let currentResponse;
let interval = null;
let timerElement;
let min;
let seconds;
let radios = document.getElementsByName("answers");

function timer() {
  timerElement = document.querySelector(".timer");
  min = 1;
  seconds = 30;
  timerElement.style.color = "#3232ff";
  if (seconds < 10 && min == 0) {
    timerElement.style.color = "#ff0000";
    timerElement.style["font-weight"] = "bold";
    timerElement.innerHTML = min + ":0" + seconds;
  }
  if (seconds < 10) {
    timerElement.innerHTML = min + ":0" + seconds;
  } else {
    timerElement.style["font-weight"] = "normal";
    timerElement.innerHTML = min + ":" + seconds;
  }
  let tick = function () {
    seconds--;
    if (seconds < 10 && min == 0) {
      timerElement.style.color = "#ff0000";
      timerElement.style["font-weight"] = "bold";
      timerElement.innerHTML = min + ":0" + seconds;
    }
    if (seconds < 10) {
      timerElement.innerHTML = min + ":0" + seconds;
    } else {
      timerElement.style["font-weight"] = "normal";
      timerElement.innerHTML = min + ":" + seconds;
    }
    if (
      min == 0 &&
      seconds == 0 &&
      currentQuestionNumber < totalNumberOfQuestions
    ) {
      nextQuestion();
    }
    if (
      min == 0 &&
      seconds == 0 &&
      currentQuestionNumber == totalNumberOfQuestions
    ) {
      seeResult();
    }
    if (seconds == 0 && min > 0) {
      min--;
      seconds = 60;
    }
  };
  interval = setInterval(tick, 1000);
}

function renderTheQuestion() {
  let currentQuestionInfo = questions.get(currentQuestionNumber);
  let questionNumber = document.querySelector(".question-number");
  questionNumber.innerHTML =
    "Question " + currentQuestionNumber + "/" + totalNumberOfQuestions;
  let question = document.querySelector(".question");
  question.innerHTML = currentQuestionInfo[0][0];
  for (let i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }
  let answers = document.getElementsByClassName("choice");
  for (let i = 0; i < answers.length; i++) {
    answers[i].innerHTML = currentQuestionInfo[1][i];
  }
  timer();
}

function nextQuestion() {
  if (currentQuestionNumber < totalNumberOfQuestions) {
    currentResponse = document.querySelector(
      'input[type="radio"]:checked + .choice'
    )?.innerHTML;
    if (!currentResponse) {
      score.set(currentQuestionNumber, 0);
    } else {
      if (currentResponse == questions.get(currentQuestionNumber)[0][1]) {
        score.set(currentQuestionNumber, 1);
        totalScore++;
      } else {
        score.set(currentQuestionNumber, 0);
      }
    }
    clearInterval(interval);
    currentQuestionNumber++;
    if (currentQuestionNumber == totalNumberOfQuestions) {
      let nextButton = document.querySelector(".nextButton");
      nextButton.style.display = "none";
      let resultsButton = document.querySelector(".resultsButton");
      resultsButton.style.display = "block";
      renderTheQuestion();
    } else {
      renderTheQuestion();
    }
  }
}

function reset() {
  window.location.href = "quiz.html";
}

function seeResult() {
  clearInterval(interval);
  currentResponse = document.querySelector(
    'input[type="radio"]:checked + .choice'
  )?.innerHTML;
  if (!currentResponse) {
    score.set(currentQuestionNumber, 0);
  } else {
    if (currentResponse == questions.get(currentQuestionNumber)[0][1]) {
      score.set(currentQuestionNumber, 1);
      totalScore++;
    } else {
      score.set(currentQuestionNumber, 0);
    }
  }
  let header = document.createElement("h1");
  header.innerHTML = "Results";
  let results = document.createElement("div");
  results.classList.add("results");
  for (let [key, value] of score) {
    if (value == 1) {
      let div = document.createElement("div");
      div.style["text-align"] = "center";
      div.innerHTML = "Q" + key + ". Correct " + "<span>&#9989;</span>";
      results.appendChild(div);
    } else {
      let div = document.createElement("div");
      div.style["text-align"] = "center";
      div.innerHTML =
        "Q" + key + ". " + " Incorrect " + "<span>&#10060;</span>";
      results.appendChild(div);
    }
  }
  let total = document.createElement("div");
  total.innerHTML = "Total score: " + totalScore + "/" + totalNumberOfQuestions;
  total.style.color = "black";
  total.style["font-weight"] = "bold";
  total.style["text-align"] = "center";
  total.style["font-size"] = "clamp(1rem, 1vw + 0.5rem, 2rem)";
  let container = document.querySelector(".container");
  container.innerHTML = "";
  container.appendChild(header);
  container.appendChild(results);
  container.appendChild(total);
  let resetButton = document.createElement("button");
  resetButton.classList.add("resetButton");
  resetButton.innerHTML = "Try Again";
  resetButton.onclick = reset;
  container.appendChild(resetButton);
}

renderTheQuestion();
