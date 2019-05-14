/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = `images\/dice-${dice}.png`

        // 3. Update the round score only if rolled number is not 1
        if (dice === 6 && lastDice === 6) {
            // Player loses score
            scores[activePlayer] = 0;
            document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
            nextPlayer();

        } else if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }
        lastDice = dice;
    }
})

// Button hold event listener
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add Current Score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        input ? winningScore = input : winningScore = 100;

        // Check if the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById(`name-${activePlayer}`).textContent = "WINNER!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {
            // Next player turn
            nextPlayer();
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init);

// Next player function
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

// Initialization function
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // Hide the initial dice image
    document.querySelector('.dice').style.display = 'none';

    // Set all scores to 0
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = "PLAYER 1";
    document.getElementById('name-1').textContent = "PLAYER 2";
    document.querySelector('.player-0-panel').classList.remove("winner");
    document.querySelector('.player-1-panel').classList.remove("winner");
    document.querySelector('.player-0-panel').classList.remove("active");
    document.querySelector('.player-1-panel').classList.remove("active");
    document.querySelector('.player-0-panel').classList.add("active");
}