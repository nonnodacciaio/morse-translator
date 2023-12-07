const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
    ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

function updateText() {
    const inputText = document.getElementById('textInput').value.toUpperCase();
    let morseCode = '';

    for (let i = 0; i < inputText.length; i++) {
        const char = inputText[i];

        if (char === ' ') {
            morseCode += ' ';
        } else if (morseCodeMap.hasOwnProperty(char)) {
            morseCode += morseCodeMap[char] + ' ';
        }
    }

    document.getElementById('displayText').innerText = morseCode.trim();
}

function playMorse() {
    const morseCode = document.getElementById('displayText').innerText;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const timeUnit = 100;
    let currentTime = audioContext.currentTime;

    morseCode.split('').forEach((symbol) => {
        switch (symbol) {
            case '.':
                playSound(currentTime, 1);
                currentTime += timeUnit / 1000;
                break;
            case '-':
                playSound(currentTime, 3);
                currentTime += timeUnit / 1000 * 3;
                break;
            case ' ':
                currentTime += timeUnit / 1000 * 7;
                break;
        }
    });

    function playSound(startTime, duration) {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(700, startTime);
        oscillator.connect(audioContext.destination);
        oscillator.start(startTime);
        oscillator.stop(startTime + duration * (timeUnit / 1000));
    }
}