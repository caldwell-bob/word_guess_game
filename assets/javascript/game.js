var wordGame = {
  word: "",
  userGuess: "",
  lettersGuessed: "",
  correctGuesses: "",
  guessRemaining: "",

  firstRun: true,
  wins: 0,
  losses: 0,

  
  

  wordChoices: ["python", "ruby", "php", "perl", "javascript", "cobol", "fortran", "java", "swift"],

  directionsText: document.getElementById("directions-text"),
  // userChoiceText: document.getElementById("userchoice-text"),
  winsText: document.getElementById("wins-text"),
  lossesText: document.getElementById("losses-text"),
  wordText: document.getElementById("wordDisplay-text"),
  lettersGuessedText: document.getElementById("lettersGuessed-text"),
  guessesRemainingText: document.getElementById("guessesRemaining-text"),
  spacerText: document.getElementById("spacer-text"),
  

  initProgress: function () {
    someWord = wordGame.word;
    theLine = "_"
    var fullString = [];
    for (i = 0; i < someWord.length; i++) {
      fullString[i] = theLine;
    }
    console.log(fullString);
    console.log(typeof (fullString));
    return fullString;
  },

  updateProgress: function (guessTracker, theWord, theGuess) {
    var fullString = [];
    fullString = guessTracker;
    for (var i = 0; i < theWord.length; i++) {
      if (theGuess == theWord[i]) {
        console.log('Its a match at position ' + i + ' !!!')
        fullString[i] = theGuess;
      }
    }
    // console.log("inside updateProgress: results -> " + fullString);
    return fullString;
  },

  isLetterInWord: function () {
    // console.log(wordGame.userGuess + " " + wordGame.word);
    var isIn = false;
    if (wordGame.word.includes(wordGame.userGuess)) {
      isIn = true;
    }
    return isIn;
  },

  getWord: function () {
    word = wordGame.wordChoices[Math.floor(Math.random() * wordGame.wordChoices.length)];
    console.log(word);
    return word;
  },


  displayCorrectGuesses: function () {
    prettyGuess = "";
    for (var i = 0; i < wordGame.correctGuesses.length; i++) {
      prettyGuess += " " + wordGame.correctGuesses[i];
    }
    return prettyGuess;
  },

  displayResults: function (correctGuesses) {
    wordGame.directionsText.textContent = " Press any key to get started!";
    wordGame.winsText.textContent = "wins: " + wordGame.wins;
    wordGame.lossesText.textContent = "losses: " + wordGame.losses;
    // wordGame.userChoiceText.textContent = "Letter Guessed: " + wordGame.userGuess;
    // wordGame.computerChoiceText.textContent = "The word to guess is : " + word;

    wordGame.lettersGuessedText.textContent = wordGame.lettersGuessed;
    // TODO how to prevent this frome moving when too many letters guessed
    wordGame.spacerText.textContent = "Letters guessed:";
    wordGame.guessesRemainingText.textContent = "Guesses: " + wordGame.guessRemaining;
    // wordGame.wordText.textContent = "Guess the programming language: " + (wordGame.correctGuesses).join(' ');
    wordGame.wordText.textContent = wordGame.displayCorrectGuesses();

  },

  resetDisplay: function (correctGuesses) {
    wordGame.lettersGuessed = "";
    wordGame.userGuess = "";
    wordGame.displayResults(correctGuesses);
    wordGame.firstRun = true;
    wordGame.guessRemaining = "";
  },

  // Main logic flow function = 
  playGame: function () {

    document.onkeyup = function (event) {

      // Determines which key was pressed.
      wordGame.userGuess = event.key;
      // console.log(wordGame.userGuess);


      // Check if userGuess has been repeated
      if (wordGame.lettersGuessed.includes(wordGame.userGuess)) {
       
        return;
        // checks if first run and if this is a repeated good guess
      } else if (!(wordGame.firstRun) && (wordGame.correctGuesses.includes(wordGame.userGuess))) {
       
        return;

      } else {
        if (wordGame.firstRun) {
          wordGame.word = wordGame.getWord();
          wordGame.guessRemaining = 12;
          wordGame.correctGuesses = wordGame.initProgress();
          wordGame.firstRun = false;
          console.log("First run - correctGuess set to: " + wordGame.correctGuesses);
        }

        wordGame.guessRemaining -= 1;

        console.log("before calling isLetterInWord: word= " + wordGame.word);

        if (wordGame.isLetterInWord(wordGame.userGuess, wordGame.word)) {
          wordGame.correctGuesses = wordGame.updateProgress(wordGame.correctGuesses, wordGame.word, wordGame.userGuess);
          console.log("returning from isLetterInWord - correctGuesses: " + wordGame.correctGuesses);
        } else {
          wordGame.lettersGuessed += wordGame.userGuess;
          console.log("Bob -- " + wordGame.lettersGuessed);
        }

        if (wordGame.correctGuesses.includes("_")) {
          console.log("more guesses");
        } else {
          wordGame.wins++;
          wordGame.correctGuesses = "";
          wordGame.resetDisplay(wordGame.correctGuesses);
          wordGame.displayResults(wordGame.userGuess);
          console.log("You won!!!");
          // wordGame.snd;
          
        }

        if (wordGame.guessRemaining === 0) {
          wordGame.losses++;
          wordGame.correctGuesses = "";
          wordGame.resetDisplay(wordGame.correctGuesses);
          wordGame.displayResults(wordGame.userGuess);
          console.log("Game Over!!!!");
        }

        wordGame.displayResults();


      }


    }
  }

}

wordGame.playGame();

