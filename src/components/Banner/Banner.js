import { GameStatus } from '../../constants';

function Banner({ gameStatus, numOfAttempts, answer, onGameRestart }) {
  if (gameStatus === GameStatus.playing) {
    return null;
  }

  return <>
    {
      gameStatus === GameStatus.win ? (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in
            {' '}
            <strong>{numOfAttempts} guesses</strong>.
          </p>
          <button className="restart-btn" onClick={onGameRestart}>
            Restart game
          </button>
        </div>
      ) : (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
          <button className="restart-btn" onClick={onGameRestart}>
            Restart game
          </button>
        </div>
      )
    }
  </>

}

export default Banner;
