// =======================
// ANIMAL TRIVIA SYSTEM
// =======================

function showInfo(animal) {

    const info = {
        Bear: "🐻 Bears are large mammals that live in forests and mountains.",
        Lion: "🦁 Lions are known as the King of the Jungle.",
        Elephant: "🐘 Elephants are the largest land animals on Earth.",
        Tiger: "🐯 Tigers are powerful striped predators.",
        Whale: "🐋 Whales are massive marine mammals.",
        Snake: "🐍 Snakes are legless reptiles.",
        Dolphin: "🐬 Dolphins are intelligent sea mammals.",
        Horse: "🐎 Horses are strong and fast animals.",
        Kangaroo: "🦘 Kangaroos carry their babies in pouches.",
        Panda: "🐼 Pandas love eating bamboo."
    };

    document.getElementById("animalInfo").innerHTML =
        "<h3>" + animal + "</h3><p>" + info[animal] + "</p>";
}


// =======================
// QUIZ SYSTEM
// =======================

const quizData = [
    {
        question: "Which animal is known as the King of the Jungle?",
        options: ["Lion", "Tiger", "Elephant"],
        answer: "Lion"
    },
    {
        question: "Which animal is the largest land animal?",
        options: ["Elephant", "Bear", "Horse"],
        answer: "Elephant"
    },
    {
        question: "Which animal lives in the ocean?",
        options: ["Whale", "Kangaroo", "Panda"],
        answer: "Whale"
    },
    {
        question: "Which animal loves bamboo?",
        options: ["Panda", "Tiger", "Snake"],
        answer: "Panda"
    },
    {
        question: "Which animal has a pouch?",
        options: ["Kangaroo", "Lion", "Bear"],
        answer: "Kangaroo"
    }
];

let currentQuestion;
let score = 0;
let askedQuestions = [];

function loadQuestion() {

    if (askedQuestions.length === quizData.length) {
        document.querySelector(".quiz-container").innerHTML =
            `<h2>🎉 Quiz Finished!</h2>
             <h3>Your Score: ${score}/${quizData.length}</h3>
             <button onclick="location.reload()">Play Again</button>`;
        return;
    }

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * quizData.length);
    } while (askedQuestions.includes(randomIndex));

    askedQuestions.push(randomIndex);
    currentQuestion = quizData[randomIndex];

    document.getElementById("question").innerText = currentQuestion.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    currentQuestion.options
        .sort(() => Math.random() - 0.5)
        .forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => checkAnswer(option);
            answersDiv.appendChild(button);
        });

    document.getElementById("nextBtn").style.display = "none";
}

function checkAnswer(selected) {

    const buttons = document.querySelectorAll("#answers button");
    buttons.forEach(btn => btn.disabled = true);

    if (selected === currentQuestion.answer) {
        score++;
        event.target.style.background = "green";
    } else {
        event.target.style.background = "red";
    }

    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("nextBtn").style.display = "inline-block";
}

function nextQuestion() {
    loadQuestion();
}

// Load first question automatically
window.onload = loadQuestion;