//Back-end

var cSharp = 0;
var rails = 0;
var android = 0;
var design = 0;
var firstQuestion = true;

var questions = {
  question1: {
    text: "What kinds of books do you prefer?",
    answer1: "Text books and technical manuals",
    answer2: "Do it yourself books",
    answer3: "Anything small, fun, and accesible",
    answer4: "Whatever is most visually appealing",
    nextQuestion: "question2"
  },
  question2: {
    text: "What's your ideal working environment?",
    answer1: "A big corporate office",
    answer2: "A small office space",
    answer3: "Home office",
    answer4: "Artist's studio",
    nextQuestion: "question3"
  },
  question3: {
    text: "What colors do you prefer?",
    answer1: "Black and white",
    answer2: "Red, red, red!",
    answer3: "Greeeeeen",
    answer4: "All colors are great, provided they're used correctly",
    nextQuestion: "question4"
  },
  question4: {
    text: "How do you know you've created something great?",
    answer1: "No one even knows it's there because it works so perfectly",
    answer2: "It's functional with minimal time commitment",
    answer3: "Everyone wants to play with it",
    answer4: "Beauty is in the eye of the beholder; what does great really mean anyway?",
    nextQuestion: "question5"
  },
  question5: {
    text: "Which company sounds the coolest?",
    answer1: "See Sharp: Tactical Eyewear",
    answer2: "Rubies on Rails: Gemstone Shipping and Logistics",
    answer3: "And Roid: Personal Trainers",
    answer4: "D-Zine: We were a zine before e-zines",
    nextQuestion: "suggestion"
  },
  suggestion: {
    cSharp: "C#",
    rails: "Ruby on Rails",
    android: "Java/Android",
    design: "Design"
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

  for (i = 1; i < totals.length; i++) {

    if (totals[i] === max) {
      maxIndex = i;
      maxArray.push(maxIndex);
    } else if (totals[i] > max) {
      max = totals[i];
      maxIndex = i;
      maxArray = [maxIndex];
    }
  }

  if (maxArray.length === 2) {
    return suggestionsArray = [choices[maxArray[0]], choices[maxArray[1]]];
  } else {
    return choices[maxArray[0]];
  }
}

function giveSuggestion() {
  var totals = checkTotals();

  if (Array.isArray(totals)) {
    var response = "<a href=\"https://www.epicodus.com/portland/\">It sounds like you should take our " + questions.suggestion[totals[0]] + " track, or our " + questions.suggestion[totals[1]] + " track!</a>";
    return response;
  } else {
    var response = "<a href=\"https://www.epicodus.com/portland/\">It sounds like should take our " + questions.suggestion[totals] + " track!</a>";
    return response;
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
    $("input:radio[name=answer]:checked").removeAttr("checked");
  }

  function unCheck() {
    $("input:radio[name=answer]:checked")[0].checked = false;
  }

  $("input:radio").click(function() {
    $("button[type=submit]").removeAttr("disabled");
  });

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
      unCheck();
      $("button[type=submit]").attr("disabled", "disabled");
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
      unCheck();
      $("button[type=submit]").attr("disabled", "disabled");
    }

    event.preventDefault();
  });

  $(".refresh").click(function() {
    location.reload();
  });
});
