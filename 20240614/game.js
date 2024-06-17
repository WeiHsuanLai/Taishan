$(document).ready(function() {
  var targetNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
  var messageElement = $('#message');

  $('#checkButton').click(function() {
      var guess = parseInt($('#guessInput').val());
      if (isNaN(guess)) {
          messageElement.text('Please enter a valid number.');
          return;
      }

      if (guess === targetNumber) {
          messageElement.text('Congratulations You guessed correctly!');
      } else if (guess > targetNumber) {
          messageElement.text('Too high Try again.');
      } else {
          messageElement.text('Too low Try again.');
      }
  });
});
