const playBtn = document.getElementById("play");
const numberBox = document.querySelector(".number");
const msgContainer = document.querySelector(".msg-container");
const mainContainer = document.querySelector(".container");

playBtn.addEventListener("click", playGame);
mainContainer.addEventListener("click", playAgain);

function playGame(event) {
	numberBox.style.display = "flex";
	playBtn.style.display = "none";

	const randomNumber = getRandomNumber();
	console.log(randomNumber);

	window.SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;

	let recognition = new window.SpeechRecognition();

	recognition.start();

	recognition.addEventListener("result", function (e) {
		message = e.results[0][0].transcript;

		displayMessage(message);
		checkMessage(message, randomNumber);
	});

	recognition.addEventListener("end", () => recognition.start());
}

function playAgain(event) {
	if (event.target.lastElementChild === "button#play-agin") {
		window.location.reload();
	}
	console.log(event);
}

function getRandomNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

function displayMessage(message) {
	msgContainer.innerHTML = `
            <h4>YOU SAID:</h4>
            <h1 class="num-container">${message}</h1>
      `;
}

function checkMessage(message, randomNumber) {
	const number = +message;

	if (isNaN(number)) {
		msgContainer.innerHTML = `
            <h3 class="warning">This is not a number</h3>
            `;
		return;
	}

	if (number > 100 || number < 1) {
		msgContainer.innerHTML = `
            <h3 class="warning">Number MUST be between 1 and 100</h3>
            `;
		return;
	}

	if (number === randomNumber) {
		mainContainer.innerHTML = `
            <h1>Congratulations!!!🎉🎉</h1>
            <h2 class="msg-container">The magic number is <span class="warning">${number}</span></h2>
            <button class="play-btn" id="play-again">Play Again</button>
            `;
	} else if (number < randomNumber) {
		msgContainer.innerHTML += `
             <h3 class="warning">GO HIGHER</h3>
            `;
	} else {
		msgContainer.innerHTML += `
             <h3 class="warning">GO LOWER</h3>
            `;
	}
}
