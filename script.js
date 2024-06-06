'use strict';

//Selecting elements
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const p1ScoreEl = document.getElementById('score--0');
const p2ScoreEl = document.getElementById('score--1');
const p1CurrentScoreEl = document.getElementById('current--0');
const p2CurrentScoreEl = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRole = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//initializing starting conditions
init();

//functions
function getRandomNumber(max) {
  return Math.trunc(Math.random() * max) + 1;
}

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // 0- player 1 and 1- player 2
  playing = true;
  p1ScoreEl.textContent = 0;
  p2ScoreEl.textContent = 0;
  p1CurrentScoreEl.textContent = 0;
  p2CurrentScoreEl.textContent = 0;
  diceEl.classList.add('hidden');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
}

function switchPlayer() {
  //switch player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //ovo toggle ce ako class player--active postoji vec na tom elementu da je skloni, a ako ne postoji dodace je!
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
}

btnRole.addEventListener('click', function () {
  if (playing) {
    //generating random dice roll and showing the diceEl with according number
    const diceNumber = getRandomNumber(6);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      //add dice rool to a current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
