const textToType = document.getElementById("textToType").textContent;
const typingArea = document.getElementById("typingArea");
const startButton = document.getElementById("startButton");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const timeTakenDisplay = document.getElementById("timeTaken");

let startTime, timer;

startButton.addEventListener("click", startTest);
typingArea.addEventListener("input", updateStats);

function startTest() {
    typingArea.value = "";
    startTime = new Date();
    typingArea.focus();
    startButton.disabled = true;
    timer = setInterval(updateStats, 1000);
}

function updateStats() {
    const textTyped = typingArea.value;
    const timeElapsed = (new Date() - startTime) / 1000; // in seconds

    const wordsTyped = textTyped.split(" ").length;
    const wpm = Math.round((wordsTyped / timeElapsed) * 60);
    
    const correctChars = [...textTyped].filter((char, index) => char === textToType[index]).length;
    const accuracy = Math.round((correctChars / textTyped.length) * 100) || 0;

    wpmDisplay.textContent = `WPM: ${wpm}`;
    accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
    timeTakenDisplay.textContent = `Time Taken: ${Math.floor(timeElapsed)}s`;

    if (textTyped === textToType) {
        clearInterval(timer);
        startButton.disabled = false;
    }
}
