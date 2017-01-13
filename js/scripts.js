//Back-end

var cSharp = 0;
var rails = 0;
var android = 0;
var design = 0;
var questionCount = 0;

function updateTotals(answer) {
  if (answer === "1") {
    cSharp ++;
  } else if (answer === "2") {
    rails ++;
  } else if (answer === "3") {
    android ++;
  } else {
    design ++;
  }
}

//Front-end

$(function() {
  $("form").submit(function(event) {
    if (questionCount === 0) {
      $("#answer4").show();
    }

    questionCount ++;

    event.preventDefault();
  });
});
