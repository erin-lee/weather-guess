var answer = Math.floor(Math.random()*100);
var $body = $('body');
var $newGame = $("button");
var $reply = $("#reply");
var $replySm = $("#reply-2");
var $guess = $("#guess");
var guesses = [];
var prevGuess = null;
var $submitAnswer = $("#submit");
$newGame.hide();

console.log("The Answer: " + answer);

$submitAnswer.on("click", submit);

$newGame.click(newGame);

function newGame() {
  answer = Math.floor(Math.random()*100);
  guesses = [];

  $body.css("background-color", "hsl(180, 100%, 30%)");
  $reply.text("New Game!");
  $("h4").empty();
  $newGame.hide();
  $("#guess").val("");
  $submitAnswer.fadeIn();
  $("ul").empty();

 console.log(answer);
}

function submit() {
  var guess = $("#guess").val();
  console.log("the guess: " + guess);
  var difference = Math.abs(guess - answer);
  var emptyGuess = !guess.match(/\S/);

  // Validate: guess is not a number or is blank
  if (isNaN(guess) || emptyGuess) {
    if (emptyGuess) {
      $reply.html( "No empty spaces. <br> Please enter a valid number");
    } else {
      $reply.html( guess + " is not a number. <br>Please enter a valid number");
      $replySm.empty(); }
    } else if (Number(guess) == answer) { /* Win: correct answer */
      $reply.text(guess + " is HHhhot!");
      $replySm.text("Nice Job!");
      $body.css("background-color", "hsl(1, 46%, 50%)");
      $submitAnswer.fadeOut();
      $newGame.fadeIn().focus();
    } else {
      $reply.text("You guessed " + guess);
      $guess.val("").focus();
      guesses.push(guess);
      if (guesses.length > 1) {
        compareGuess(difference);
      }
      console.log(guesses);
      checkTemp(difference, guess);
    }
  return false;
}

function compareGuess(difference) {
  var prevGuess = Number(guesses[guesses.length-2]);
  var prevDiff = Math.abs(prevGuess - answer);

  if (difference > prevDiff) {
    $replySm.text("Ccccolder. Try another guess");
  } else if (difference < 5) {
    $replySm.text("Getting Hhhhotter");
  } else {
    $replySm.text("Getting Warmer.");
  }
}

function checkTemp(difference, guess) {
  if (difference > 15) {
    if (difference > 30) {
      temperature = 75;
      $("ul").append("<li style='background-color: hsl(192, 49%, " + temperature + "%)')" + ">" + guess + "</li>");
      $body.css("background-color", "hsl(192, 49%, " + temperature + "%");
    } else {
      $("ul").append("<li style='background-color: hsl(192, 49%, " + Number(51 + difference) + "%)'>" + guess + "</li>");
      $body.css("background-color", "hsl(192, 49%, " + Number(51 + difference) + "%");}
  } else {
    temperature = Number(50 - difference);
    $("ul").append("<li style='background-color: hsl(2, 47%, " + temperature +  "%)'>" + guess + "</li>");
    $body.css("background-color", "hsl(2, 47%, " + temperature + "%");
  }
}