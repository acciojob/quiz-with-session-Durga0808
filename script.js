//your JS code here.
// User answers will be stored in this object
let userAnswers = {};

// Load user answers from session storage if available
const storedAnswers = sessionStorage.getItem("userAnswers");
if (storedAnswers) {
  userAnswers = JSON.parse(storedAnswers);
}
// Function to calculate and display the user's score
function submitQuiz() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const userAnswer = userAnswers[`question-${i}`];
    if (userAnswer === question.answer) {
      score++;
    }
  }

  document.getElementById("score").innerText = `Your score is ${score} out of ${questions.length}.`;

  // Save the score to local storage
  localStorage.setItem("score", score);
}

// Load the questions when the page loads
document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();

  // Add click event listener to the submit button
  document.getElementById("submit").addEventListener("click", submitQuiz);
});
// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear previous content if any

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.className = "question";
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    questionElement.appendChild(document.createElement("br"));

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (userAnswers[`question-${i}`] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      choiceElement.addEventListener("change", (e) => {
        userAnswers[`question-${i}`] = e.target.value;
        sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();
