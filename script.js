const questions = [
    { question: "What's the last game you played?", options: ["FIFA", "Chess", "Badminton", "Too lazy to play"] },
    { question: "Who did you last text?", options: ["Mum", "Pops", "Bro", "Best friend", "No one's there to text"] },
    { question: "Which app you used last?", options: ["WhatsApp", "LinkedIn", "Instagram", "X", "Useless"] },
    { question: "How are you feeling right now?", options: ["Great", "In mood for a party", "Working out", "Alone"] }
];

const moods = {
    Happy: {
        song: "happy.mp3",
        message: "You seem to be in a great mood! Here's a surprise song for you. 🎶",
        quote: "“But who's making you happy that's right I AM hehehe.”"
    },
    Sad: {
        song: "sad.mp3",
        message: "Feeling a bit down? Here's something to cheer you up! 💖",
        quote: "“Just trust the process. If you're feeling down, text someone you trust and talk it out. It always helps.”"
    },
    Tensed: {
        song: "tensed.mp3",
        message: "Life's a bit hectic? Relax with this tune. 🌿",
        quote: "“Life is unfair, so relax a bit and listen to your favorite person.”"
    },
    Annoyed: {
        song: "motivation.mp3",
        message: "Feeling annoyed? Shake it off with this track! 🎸",
        quote: "“Turn your frustration into motivation!”"
    }
};

let currentQuestion = 0;
let selectedOptions = [];

const quizContainer = document.getElementById("quiz-container");
const startButton = document.getElementById("start-btn");
const resultContainer = document.getElementById("result");
const songPlayer = document.getElementById("song");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        predictMood();
        return;
    }

    const questionData = questions[currentQuestion];
    quizContainer.innerHTML = `
        <h2>${questionData.question}</h2>
        ${questionData.options
            .map((option) => `<button class="option-btn" onclick="selectOption('${option}')">${option}</button>`)
            .join('')}
    `;
}

function selectOption(option) {
    selectedOptions.push(option);
    currentQuestion++;
    showQuestion();
}

function predictMood() {
    let mood = "Annoyed"; // Default mood

    // Mood prediction logic
    if (
        selectedOptions.includes("FIFA") ||
        selectedOptions.includes("Great") ||
        selectedOptions.includes("Best friend") ||
        selectedOptions.includes("Instagram") ||
        selectedOptions.includes("Bro")
    ) {
        mood = "Happy";
    } else if (
        selectedOptions.includes("Too lazy to play") ||
        selectedOptions.includes("No one's there to text") ||
        selectedOptions.includes("Alone") ||
        selectedOptions.includes("Useless")
    ) {
        mood = "Sad";
    } else if (
        selectedOptions.includes("Working out") ||
        selectedOptions.includes("LinkedIn") ||
        selectedOptions.includes("Chess")
    ) {
        mood = "Tensed";
    }

    displayResult(mood);
}

function displayResult(mood) {
    const moodData = moods[mood];
    resultContainer.innerHTML = `
        <h2>${moodData.message}</h2>
        <p>${moodData.quote}</p>
    `;
    songPlayer.src = moodData.song;
    songPlayer.style.display = "block";
    songPlayer.play();
}
