import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput';
import Guess from '../Guess';
import Banner from '../Banner';
import { checkGuess } from '../../game-helpers';
import Keyboard from '../Keyboard/Keyboard';
import { GameStatus, NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { range } from '../../utils';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [userGuesses, setUserGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState(GameStatus.playing);
  const [isGameOver, setIsGameOver] = React.useState(false);

  function handleAddNewGuess(guess) {
    const newGuess = {
      guess,
      status: checkGuess(guess, answer),
      id: crypto.randomUUID(),
    };
    const updatedGuesses = [...userGuesses, newGuess];

    checkGameStatus(updatedGuesses.length, guess);
    setUserGuesses(updatedGuesses);
  }

  function checkGameStatus(attempts, lastGuess) {
    console.info(attempts, lastGuess)
    if (answer === lastGuess) {
      setGameStatus(GameStatus.win);
      setIsGameOver(true);
    } else if (attempts >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus(GameStatus.lost);
      setIsGameOver(true);
    }
  }

  return (
    <>
      <div className="guess-results">
        {range(0, NUM_OF_GUESSES_ALLOWED, 1).map((index) => (
          <Guess
            key={index}
            guessResult={userGuesses[index]?.status}
          />
        ))}
      </div>
      <GuessInput onAddNewGuess={handleAddNewGuess} isGameOver={isGameOver} />
      <Keyboard guesses={userGuesses} />
      <Banner
        gameStatus={gameStatus}
        numOfAttempts={userGuesses.length}
        answer={answer} />
    </>
  );
}

export default Game;
