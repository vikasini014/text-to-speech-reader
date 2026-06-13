const textInput = document.getElementById("text");
const voiceSelect = document.getElementById("voiceSelect");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");

let voices = [];

function loadVoices() {
    voices = speechSynthesis.getVoices();

    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

loadVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

speakBtn.addEventListener("click", () => {
    const text = textInput.value;

    if (!text) {
        alert("Please enter some text");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    const selectedVoice = voices[voiceSelect.value];
    utterance.voice = selectedVoice;

    speechSynthesis.speak(utterance);
});

stopBtn.addEventListener("click", () => {
    speechSynthesis.cancel();
});