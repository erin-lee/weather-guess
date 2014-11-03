var HotOrCold = {

  init: function( settings ) {
    HotOrCold.config = {
      answer: Math.floor(Math.random()*100),
      $body: $('body'),
      $newGame: $('#newGame'),
      $reply: $('#reply'),
      $replySm: $('#reply-2'),
      $guess: $("#guess"),
      guesses: [],
      $submitAnswer: $('#submit')
    };

    // allow overriding the default config
    $.extend( HotOrCold.config, settings );

    HotOrCold.config.$newGame.hide();

    HotOrCold.setup();
  },

  setup: function() {
    HotOrCold.config.$submitAnswer.on( 'click', HotOrCold.validateGuess );
    HotOrCold.config.$newGame.on('click', HotOrCold.startNewGame);
  },

  startGame: function(guess) {

    // When a new round is started, there should be a new Answer
    var answer = HotOrCold.config.answer;
    var guess = Number(guess);
    console.log("The Guess ", guess);
    console.log("The Answer ", answer);

    if (guess == answer) {
      HotOrCold.showSuccess(guess);
    } else {
      HotOrCold.guessAgain(guess, answer);
    }
  },

  startNewGame: function() {
    console.log('hi');
    // var guesses = HotOrCold.config.guesses;

    HotOrCold.config.$body.css("background-color", "hsl(180, 100%, 30%)");
    HotOrCold.config.$reply.text("New Game!");
    HotOrCold.config.$newGame.hide();
    HotOrCold.config.$guess.val("");
    HotOrCold.config.$submitAnswer.fadeIn();
    $("h4").empty();
    $("ul").empty();
  },

  guessAgain: function(guess, answer) {
    var guesses = HotOrCold.config.guesses;
    HotOrCold.config.$reply.text("You guessed " + guess);
    HotOrCold.config.$guess.val("").focus();
    guesses.push(guess);

    console.log(HotOrCold.config.guesses);
    if (guesses.length > 1) {
      HotOrCold.compareGuesses(guess, guesses, answer);
    }
  },

  compareGuesses: function(guess, guesses, answer) {
    var difference = Math.abs(guess - answer);
    var prevGuess = Number(guesses[guesses.length-2]);
    var prevDiff = Math.abs(prevGuess - answer);

    HotOrCold.changeTemperature(difference, guess);

    if (difference > prevDiff) {
      HotOrCold.config.$replySm.text("Ccccolder. Try another guess");
    } else if (difference < 5) {
      HotOrCold.config.$replySm.text("Getting Hhhhotter");
    } else {
      HotOrCold.config.$replySm.text("Getting Warmer.");
    }
  },

  changeTemperature: function(difference, guess) {
    var $ul = $("ul");
    var temperature = null;

    if (difference > 15) {
      if (difference > 30) {
        var temperature = 75;
        $ul.append("<li style='background-color: hsl(192, 49%, " + temperature + "%)')" + ">" + guess + "</li>");
        HotOrCold.config.$body.css("background-color", "hsl(192, 49%, " + temperature + "%");
      } else {
        $ul.append("<li style='background-color: hsl(192, 49%, " + Number(51 + difference) + "%)'>" + guess + "</li>");
        HotOrCold.config.$body.css("background-color", "hsl(192, 49%, " + Number(51 + difference) + "%");}
    } else {
      var temperature = Number(50 - difference);
      $ul.append("<li style='background-color: hsl(2, 47%, " + temperature +  "%)'>" + guess + "</li>");
      HotOrCold.config.$body.css("background-color", "hsl(2, 47%, " + temperature + "%");
    }
  },

  validateGuess: function() {
    var guess = HotOrCold.config.$guess.val();
    var emptyGuess = !guess.match(/\S/);

    if (isNaN(guess) || emptyGuess) {
      HotOrCold.showErrorMessage(guess);
    } else {
      HotOrCold.startGame(guess);
    }

    return false;
  },

  showErrorMessage: function(invalidGuess) {
    if (isNaN(invalidGuess)) {
      HotOrCold.config.$reply.html( invalidGuess + " is not a number. <br>Please enter a valid number");
      HotOrCold.config.$replySm.empty();
    } else {
      HotOrCold.config.$reply.html("No empty spaces. <br> Please enter a valid number");
    }
  },

  showSuccess: function(correctGuess) {
    HotOrCold.config.$reply.text(correctGuess + " is HHhhot!");
    HotOrCold.config.$replySm.text("Nice Job!");
    HotOrCold.config.$body.css("background-color", "hsl(1, 46%, 50%)");
    HotOrCold.config.$submitAnswer.fadeOut();
    HotOrCold.config.$newGame.fadeIn().focus();
  }

};

$(document).ready( HotOrCold.init );