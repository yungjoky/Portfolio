document.addEventListener('DOMContentLoaded', () => {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoiceImg = document.getElementById('computerChoice');
    const resultText = document.getElementById('game-result');
    const buttons = document.querySelectorAll('.game-options button');
    const compliment = document.getElementById('ghostcompliment');
    const ghost = document.getElementById('ghost');
    ghost.style.opacity = 0;
    ghost.style.transition = 'opacity 2s ease-in-out';
    ghost.style.opacity = 1;
    let gameInProgress = false;
    compliment.textContent = "Let's see if you can beat me!";
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (gameInProgress) {
                alert("You can't change your choice while the game is ongoing");
                return;
            }
            compliment.textContent = "";
            resultText.textContent = '';
            gameInProgress = true;
            const playerChoice = button.querySelector('img').id;
            rotateImages(() => {
                const computerChoice = choices[Math.floor(Math.random() * choices.length)];
                computerChoiceImg.src = `images/js/${computerChoice}.png`;
                determineWinner(playerChoice, computerChoice);
                gameInProgress = false;
            });
        });
    });

    function rotateImages(callback) {
        let index = 0;
        const interval = setInterval(() => {
            computerChoiceImg.src = `images/js/${choices[index]}.png`;
            index = (index + 1) % choices.length;
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            callback();
        }, 2000 + Math.random() * 1000);
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            compliment.textContent = "It's a tie! You're a worthy opponent!";
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            compliment.textContent = "Congratulations! You won... I'll get you next time!";	
        } else {
            compliment.textContent = "I win! Better luck next time hehe!";
        }
    }
});