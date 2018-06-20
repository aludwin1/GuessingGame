function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function shuffle(arr) {
  let i = arr.length;
  while(i > 0) {
    let elementToShuffle = Math.floor(Math.random() * i);
    [arr[elementToShuffle], arr[i - 1]] = [arr[i - 1], arr[elementToShuffle]];
    i--;
  }
  return arr;
}

function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
  return Math.abs(this.winningNumber - this.playersGuess);
};

Game.prototype.isLower = function() {
  if(this.playersGuess < this.winningNumber) return true;
  else return false;
};


Game.prototype.checkGuess = function(num) {
  if(num === this.winningNumber) return 'You Win!';
  else if(this.pastGuesses.length === 4) return 'You Lose.';
  else if(this.pastGuesses.includes(num)) return 'You have already guessed that number.';
  else this.pastGuesses.push(num);

  if(this.difference() < 10) return 'You\'re burning up!';
  else if(this.difference() < 25) return 'You\'re lukewarm.';
  else if(this.difference() < 50) return 'You\'re a bit chilly.';
  else if(this.difference() < 100) return 'You\'re ice cold!';
};

Game.prototype.playersGuessSubmission = function(num) {
  if(num < 1 || num > 100 || typeof num !== 'number') throw 'That is an invalid guess.';
  this.playersGuess = num;
  return this.checkGuess(num);
};

function newGame() {
  return new Game();
};

Game.prototype.provideHint = function() {
  let arr = [this.winningNumber, generateWinningNumber(),generateWinningNumber()];
  return shuffle(arr);
}





