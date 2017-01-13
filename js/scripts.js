//Back-end

var cSharp = 0;
var rails = 0;
var android = 0;
var design = 0;
var firstQuestion = true;

var questions = {
  question1: {
    text: "Q1",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    nextQuestion: "question2"
  },
  question2: {
    text: "Q2",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    nextQuestion: "question3"
  },
  question3: {
    text: "Q3",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    nextQuestion: "question4"
  },
  question4: {
    text: "Q4",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    nextQuestion: "question5"
  },
  question5: {
    text: "Q5",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    nextQuestion: "suggestion"
  },
  suggestion: {
    cSharp: "",
    rails: "",
    android: "",
    design: ""
  }
}

function updateTotals(answer) {
  if (answer === "1") {
    cSharp++;
  } else if (answer === "2") {
    rails++;
  } else if (answer === "3") {
    android++;
  } else {
    design++;
  }
}

function checkTotals() {
  var totals = [cSharp, rails, android, design];
  var final = Math.max(totals);
  return final.toString();
}


//Front-end

$(function() {

  function populateFields(nextQuestion) {
    var question = questions[nextQuestion];
    $("#question").text(question.text);
    $("#answerText1").text(question.answer1);
    $("#answerText2").text(question.answer2);
    $("#answerText3").text(question.answer3);
    $("#answerText4").text(question.answer4);
  }

  $("form").submit(function(event) {
    var answer = $("input:radio[name=answer]:checked").val();

    if (firstQuestion && answer === "3") {
      $("#question").text("Thanks for checking us out!");
      $(".panel-body form").remove();
      $(".refresh").show();
    } else if (firstQuestion) {
      nextQuestion = "question1";
      populateFields(nextQuestion);
      $("#answer4").show();
      nextQuestion = "question2";
      firstQuestion = false;
    } else if (nextQuestion === "suggestion") {
      updateTotals(answer);

      var finalSuggestion = checkTotals();
      var suggestionPath = questions["suggestion"];

      $(".panel-body form").remove();
      $("#suggestion").text(suggestionPath[finalSuggestion]);
      $("#suggestion").show();
    } else {
      updateTotals(answer);
      populateFields(nextQuestion);
      nextQuestion = questions[nextQuestion].nextQuestion;
    }

    event.preventDefault();
  });

  $(".refresh").click(function() {
    location.reload();
  });
});
