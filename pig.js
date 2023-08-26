"use strict";

const score_p1 = document.getElementById("score--0");
const score_p2 = document.querySelector("#score--1");
const Player_p1 = document.querySelector(".player--0");
const Player_p2 = document.querySelector(".player--1");

let currentScore_p1 = document.querySelector("#current--0");
let currentScore_p2 = document.querySelector("#current--1");

const dice_ = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

dice_.classList.add("hidden");
score_p1.textContent = 0;
score_p2.textContent = 0;

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  Player_p1.classList.toggle("player--active");
  Player_p2.classList.toggle("player--active");
};

//rolling the dice

btnRoll.addEventListener("click", function () {
  //generate the random number;
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display dice

    dice_.classList.remove("hidden");
    dice_.src = `dice-${dice}.png`;

    // check wheather it is 0 ;
    if (dice !== 6) {
      currentScore += dice;
      // add dice to the current score

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   switch the plyer
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // add sore of the current player into score
    scores[activePlayer] += currentScore;
    // scores[1] =scores[1]+currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      dice_.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});
