import React, { useEffect } from 'react';
import { keyboardRows } from '../../constants';

function Keyboard({ guesses }) {
  const [uniqueLetters, setUniqueLetters] = React.useState([]);

  useEffect(() => {
    if (guesses.length === 0) {
      return;
    }
    const guessesStatusArr = guesses.map(guess => guess.status);
    const lastGuess = guessesStatusArr[guessesStatusArr.length - 1];
    const updatedUniqueLetters = guessesStatusArr.reduce((currentGuess, acc) => {
      const uniqueSubArray = currentGuess.filter(obj => {
        // Check if an object with the same letter property already exists
        return !acc.some(existingObj => existingObj.letter === obj.letter);
      });
      // Add unique objects from the subArray to the accumulator
      acc.push(...uniqueSubArray);
      return acc;
    }, lastGuess);

    setUniqueLetters([...updatedUniqueLetters]);
  }, [guesses]);


  return (
    <div className="keyboard">
      {keyboardRows.map(row => (
        <div key={row.join('')} className="keyboard-row">
          {row.map(key => {
            const keyStatus = uniqueLetters?.find(item => item.letter === key.toUpperCase())?.status;
            const keyClassName = keyStatus ? "keyboard-key " + keyStatus : "keyboard-key";
            return (<button key={key} className={keyClassName}>{key.toUpperCase()}</button>)
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
