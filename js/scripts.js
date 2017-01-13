//Back-end

var cSharp = 0;
var rails = 0;
var android = 0;
var design = 0;
var firstQuestion = true;

var questions = {
  question1: {
    text: "Q1",
    answer1: "C# question 1",
    answer2: "Rails question 1",
    answer3: "Android question 1",
    answer4: "Design question 1",
    nextQuestion: "question2"
  },
  question2: {
    text: "Q2",
    answer1: "C# question 2",
    answer2: "Rails question 2",
    answer3: "Android question 2",
    answer4: "Design question 2",
    nextQuestion: "question3"
  },
  question3: {
    text: "Q3",
    answer1: "C# question 3",
    answer2: "Rails question 3",
    answer3: "Android question 3",
    answer4: "Design question 3",
    nextQuestion: "question4"
  },
  question4: {
    text: "Q4",
    answer1: "C# question 4",
    answer2: "Rails question 4",
    answer3: "Android question 4",
    answer4: "Design question 4",
    nextQuestion: "question5"
  },
  question5: {
    text: "Q5",
    answer1: "C# question 5",
    answer2: "Rails question 5",
    answer3: "Android question 5",
    answer4: "Design question 5",
    nextQuestion: "suggestion"
  },
  suggestion: {
    cSharp: "It sounds like you should check out our C# track!",
    rails: "It sounds like you should check out our Ruby on Rails track!",
    android: "It sounds like you should check out our Java/Android track!",
    design: "It sounds like you should check out our Design track!"
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
  var choices = ["cSharp", "rails", "android", "design"];
  var max = totals[0];
  var maxIndex = 0;
  var maxArray = [0];

  for (var i = 1; i < totals.length; i++) {
    if (totals[i] > max) {
      max = totals[i];
      maxIndex = i;
      maxArray = [maxIndex];
    } else if (totals[i] === max) {
      maxIndex = i;
      maxArray.append(maxIndex);
    }

    if (maxArray.length === 2) {
      suggestionsArray = [choices[maxArray[0]], choices[maxArray[1]]];
    } else {
      return choices[maxArray[0]];
    }
  }
}

function giveSuggestion() {
  var totals = checkTotals();

  if (Array.isArray(totals)) {
    console.log("is array");
    debugger;
  } else {
    return questions.suggestion[totals];
  }
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

      var finalSuggestion = giveSuggestion();

      $("form").remove();
      $("#question").text("Thanks for taking our quiz.");
      $("#suggestion").prepend("<h3>" + finalSuggestion + "</h3>");
      $("#suggestion").show();

      event.preventDefault();
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
