$(document).ready(function() {
  $.get('https://raw.githubusercontent.com/owencade/questions.txt/main/questions.txt', function(data) {
    var questions = data.split('\n');
    for (var i = 0; i < questions.length; i++) {
      if (questions[i]) {
        $('#questions-list').append('<li>' + questions[i] + '</li>');
      }
    }
  });
  
  $('form').submit(function(event) {
    event.preventDefault();
    var question = $('input[type="text"]').val();
    if (question) {
      $('#questions-list').append('<li>' + question + '</li>');
      $('input[type="text"]').val('');
    }
  });
});
