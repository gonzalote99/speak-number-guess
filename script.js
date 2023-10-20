const msgEl = document.getElementById('msg');
const randomNum = getRandomNumber();

console.log('number', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

function writeMessage(msg) {
msgEl.innerHTML = `
<div>you said</div>
<span class="box">${msg}</span>
`;
}

function checkNumber(msg) {
  const num = +msg;

  if(Number.isNaN(num)) {
    msgEl.innerHTML += '<div>not valid number</div>';
    return;
  }

  if(num > 100 || num < 1) {
    msgEl.innerHTML += '<div>number must 1-100</div>';
    return;
  }


  if(num === randomNum) {
    document.body.innerHTML = `
    <h2>guessed the number  <br><br>
    it was ${num}
    </h2>
    <button class='play-again' id='play-again'>play again</button>
    `;
  } else if(num > randomNum) {
    msgEl.innerHTML += '<div>go lower</div>';
  } else {
    msgEl.innerHTML += '<div>go higher</div>';
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;

}

recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
  if(e.target.id == 'play-again') {
    window.location.reload();
  }
});