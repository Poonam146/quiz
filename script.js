document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "🌍 What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "🪐 Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "📖 Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  });

  restartBtn.addEventListener("click", () => {
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  });

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";

    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(li, choice));
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(li, choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const options = choicesList.querySelectorAll("li");

    // disable further clicks
    options.forEach((opt) => (opt.style.pointerEvents = "none"));

    if (choice === correctAnswer) {
      li.classList.add("correct");
      score++;
    } else {
      li.classList.add("wrong");
      // highlight correct one
      options.forEach((opt) => {
        if (opt.textContent === correctAnswer) {
          opt.classList.add("correct");
        }
      });
    }

    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `✅ You scored ${score} out of ${questions.length}`;
  }
});
