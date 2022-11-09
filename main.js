import { wordList, headerRandomCharacters } from "./words.js";

// GETS RANDOM WORD FROM THE LIST & TURN IT INTO ARRAY
function getRandomWord() {
  const getRandomNumber = Math.floor(Math.random() * wordList.length) + 1;
  const getRandomWord = wordList[getRandomNumber];
  console.log(`Word #${getRandomNumber}: ${getRandomWord}`);
  const header = document.querySelector("#target-word");
  header.innerHTML = getRandomWord.toUpperCase();
  return getRandomWord;
}
const randomWord = getRandomWord();

function randomWordIntoArray(word) {
  const splitWord = word.split("");
  console.log(splitWord);
  return splitWord;
}
const randomWordAsArray = randomWordIntoArray(randomWord);

// CREATES EMPTY WORD BOARD
const createEmptyBoard = () => {
  const guessWordObject = {};
  for (let i = 1; i <= 6; i++) {
    guessWordObject[`row${i}`] = [];
    const underscore = "_";
    for (let j = 0; j < randomWordAsArray.length; j++) {
      // console.log(`row${i}`);
      guessWordObject[`row${i}`].push(underscore);
    }
  }
  return guessWordObject;
};
const wordsBoard = createEmptyBoard();

console.log("wordsBoard: ", wordsBoard);
const rowCounterMax = Object.keys(wordsBoard).length;
let rowCounter = 1; //Max 6 - object length
let characterCounter = 0; //Max 4 (5 - 1)
console.log("Row Counter: ", rowCounter);
console.log("Access wordsBoard: ", wordsBoard[`row${rowCounter}`]);

// MIRRORS WORD BOARD ON THE HTML PAGE
function mirrorWordBoard(board) {
  for (let i = 1; i <= rowCounterMax; i++) {
    for (let j = 0; j < board[`row${i}`].length; j++) {
      let gridOnPage = document
        .querySelectorAll(`.guess`)
        [i - 1].querySelector(`.guess :nth-child(${[j + 1]})`);
      gridOnPage.textContent = board[`row${i}`][j];
    }
  }
}
mirrorWordBoard(wordsBoard);

// LISTEN FOR KEYBOARD LETTERS CLICKS
const lettersOnKeyboard = document.querySelectorAll(".keyboard-letter");
lettersOnKeyboard.forEach(listenForA_Z);
//// Listen for all Letters
function listenForA_Z(item) {
  item.addEventListener("click", function () {
    let letterA_Z = item.innerHTML.toUpperCase();
    // console.log("You clicked: ", letterA_Z);
    return insertLetter(letterA_Z);
  });
}
//// Listen for Enter
const enterOnKeyboard = document.querySelector("#keyboard-enter-button");
enterOnKeyboard.addEventListener("click", function () {
  console.log("you clicked: ", enterOnKeyboard.value);
  return evaluateLetters(wordsBoard[`row${rowCounter}`]);
});
//// Listen for Delete
const deleteOnKeyboard = document.querySelector("#keyboard-delete-button");
deleteOnKeyboard.addEventListener("click", function () {
  // console.log("you clicked: ", deleteOnKeyboard.value);
  return deleteLetter("_");
});

// INSERTS-DELETES LETTERS INTO/FROM WORD BOARD
console.log("Character counter: ", characterCounter);
function insertLetter(character) {
  console.log("Inserting letter: ", character);
  let selectRow = wordsBoard[`row${rowCounter}`];
  if (characterCounter < selectRow.length) {
    selectRow[characterCounter] = character;
    characterCounter = characterCounter + 1;
    mirrorWordBoard(wordsBoard);
  }
  console.log("Character counter: ", characterCounter);
  console.log(selectRow);
}
function deleteLetter(character) {
  console.log("Deleting letter: ", character);
  let selectRow = wordsBoard[`row${rowCounter}`];
  if (characterCounter <= selectRow.length && characterCounter > 0) {
    selectRow[characterCounter - 1] = character;
    characterCounter = characterCounter - 1;
    mirrorWordBoard(wordsBoard);
  }
  console.log("Character counter: ", characterCounter);
  console.log(selectRow);
}

//EVALUATE LETTERS AS WORD (ENTER)
function evaluateLetters(rowOfLetters) {
  //change row of letters into word (string)
  const word = rowOfLetters.join("").toLowerCase();
  console.log("Word to be evaluated: ", word);

  //check if guess word is in the dictionary (is a valid word - true/false)
  const isWordOnList = wordList.includes(word);
  console.log("Evaluated word is on the list: ", isWordOnList);

  // check for win
  if (
    isWordOnList === true &&
    rowCounter <= rowCounterMax &&
    word === randomWord
  ) {
    for (let i = 0; i < word.length; i++) {
      for (let j = 0; j < randomWord.length; j++) {
        if (word[i] === randomWord[j] && i === j) {
          let gridOnPage = document
            .querySelectorAll(`.guess`)
            [rowCounter - 1].querySelector(`.guess :nth-child(${i + 1})`);
          gridOnPage.className = "guess-letter-green";
        }
      }
    }
    console.log("YOU WON!");
  }
  //check if any letters from guess word are in target word
  else if (isWordOnList === true && rowCounter <= rowCounterMax) {
    rowCounter = rowCounter + 1;
    characterCounter = 0;
    console.log("Evaluation level 2");
    console.log("Row Counter: ", rowCounter);
    for (let i = 0; i < word.length; i++) {
      console.log("i: ", word[i]);
      for (let j = 0; j < randomWord.length; j++) {
        console.log("j: ", randomWord[j]);
        if (word[i] === randomWord[j] && i !== j) {
          // mark orange
          console.log("SAME LETTERS: ", i, word[i], j, randomWord[j]);
          let gridOnPage = document
            .querySelectorAll(`.guess`)
            [rowCounter - 2].querySelector(`.guess :nth-child(${i + 1})`);
          gridOnPage.className = "guess-letter-orange";
        } else if (word[i] === randomWord[j] && i === j) {
          // mark orange
          console.log(
            "SAME LETTERS and POSITION: ",
            i,
            word[i],
            j,
            randomWord[j]
          );
          let gridOnPage = document
            .querySelectorAll(`.guess`)
            [rowCounter - 2].querySelector(`.guess :nth-child(${i + 1})`);
          gridOnPage.className = "guess-letter-green";
        }
      }
    }
  }
}

// TO DO:
// better way to select winning word than loop?
// issues with double letters, one always stays orange ( potential problem - after selecting class orange it doesn't recognize new class)
// after ending game, player still able to delete letters on the last row.

//upgrade?
//longer words (difficulty level)
//API to word translator
//Login to store results and statistics
//better CSS
//
