// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {

    for (const pointValue in oldPointStructure) {

      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }

    }
  }
  return letterPoints;
}


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word;
function initialPrompt() {
  console.log("Let's play some scrabble!");
  word = input.question("\n\n Enter a word to score: ");
};

let simpleScore = function(inputWord) {
  return inputWord.length;
}

let vowelBonusScore = function(inputWord) {
  let score = 0;
  const vowels = ["a", "e", "i", "o", "u"];
  for (let i = 0; i < inputWord.length; i++) {
    if (vowels.includes(inputWord.charAt(i).toLowerCase())) {
      score = score + 3;

    } else {
      score = score + 1;

    }
  }
  return score;

}

let scrabbleScore = function(inputWord) {
  inputWord = inputWord.toLowerCase();
  let wordPoints = 0;
  for (let i = 0; i < inputWord.length; i++) {
    wordPoints = wordPoints + newPointStructure[inputWord.charAt(i)];
  }
  return wordPoints;

};


const scoringAlgorithms = [
  {
    name: "Simple Score", discription: "Each letter is worth 1 point.", scoringFunction: simpleScore

  },
  {
    name: "Bonus Vowels	", discription: "Vowels are 3 pts, consonants are 1 pt.", scoringFunction: vowelBonusScore
  },
  {
    name: "Scrabble", discription: "The traditional scoring algorithm.", scoringFunction: scrabbleScore
  }
];

function scorerPrompt() {
  const selectedAlgorithm = input.question(`Which scoring algorithm would you like to use?
  
 0 - Simple: One point per character
 1 - Vowel Bonus: Vowels are worth 3 points
 2 - Scrabble: Uses scrabble point system
 Enter 0, 1, or 2: `);
  if (selectedAlgorithm < 0 || selectedAlgorithm > 2) {
    console.log("\nInvalid Input\n");
    scorerPrompt();
  } else {
    console.log("algorithm name: ", scoringAlgorithms[selectedAlgorithm].name);
    console.log(`Score for '${word}': `, scoringAlgorithms[selectedAlgorithm].scoringFunction(word));
  }
}

function transform(oldPointStructure) {
  const newStructucre = {};
  for (key in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[key].length; i++) {
      newStructucre[oldPointStructure[key][i].toLowerCase()] = Number(key);
    }
  }
  return newStructucre;
};

let newPointStructure = transform(oldPointStructure);


function runProgram() {
  initialPrompt();
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScore: simpleScore,
  vowelBonusScore: vowelBonusScore,
  scrabbleScore: scrabbleScore,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};

