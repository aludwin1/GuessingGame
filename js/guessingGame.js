function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function shuffle(arr) {
  let i = arr.length;
  while (i > 0) {
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

function newGame() {
  return new Game();
}

Game.prototype.difference = function() {
  return Math.abs(this.winningNumber - this.playersGuess);
};

Game.prototype.isLower = function() {
  if (this.playersGuess < this.winningNumber) return true;
  else return false;
};

Game.prototype.checkGuess = function(num) {
  if (num === this.winningNumber) return 'You Win!';
  else if (this.pastGuesses.length === 4) {
    this.pastGuesses.push(num);
    return 'You Lose.';
  } else if (this.pastGuesses.includes(num)) return 'You have already guessed that number.';
  else this.pastGuesses.push(num);

  if (this.difference() < 10) return "You're burning up!";
  else if (this.difference() < 25) return "You're lukewarm.";
  else if (this.difference() < 50) return "You're a bit chilly.";
  else if (this.difference() < 100) return "You're ice cold!";
};

Game.prototype.playersGuessSubmission = function(num) {
  if (num < 1 || num > 100 || typeof num !== 'number')
    return 'That is an invalid guess.';
  this.playersGuess = num;
  return this.checkGuess(num);
};

Game.prototype.provideHint = function() {
  let arr = [
    this.winningNumber,
    generateWinningNumber(),
    generateWinningNumber(),
  ];
  return shuffle(arr);
};


$(document).ready(function() {
  let game = new Game();

  function guess() {
    const input = Number($('#player-input').val());
    const output = game.playersGuessSubmission(input);
    if(output === 'You have already guessed that number.') $('h1').text('Guess Again!');
    else if(output === 'You Lose.' || output === 'You Win!') {
      $('h1').text(output);
      $('li').eq(game.pastGuesses.length - 1).text(input);
      $('h4').text('Click the reset button to play again!');
    } else {
      $('li').eq(game.pastGuesses.length - 1).text(input);
      $('h1').text(output);
    }
  }

  function reset() {
    game = newGame();
    $('h1').text('Play the Guessing Game!');
    $('h4').text('Guess a number between 1-100!');
    $('#player-input').val('');
    $('li').text('-');
  }

  $('#submit').click(function() {
    guess();
  });

  $('#Reset').click(function(){
    reset();
  });

  $('#player-input').keypress(function(event) {
    if(event.which === 13) guess();
  });
});
