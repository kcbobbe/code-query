// const $allQuestionContainer = $(".allQuestion");

$(document).ready(function() {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  $("#HTMLTag").click(function() {
    console.log("HTML clicked");
    const questionTag = "HTML";
    console.log(questionTag);
    renderQuestionTagQuestions(questionTag);
  });

  $("#CSSTag").click(function() {
    console.log("CSS clicked");
    const questionTag = "CSS";
    console.log(questionTag);
    renderQuestionTagQuestions(questionTag);
  });

  $("#JSTag").click(function() {
    console.log("JS clicked");
    const questionTag = "JavaScript";
    console.log(questionTag);
    renderQuestionTagQuestions(questionTag);
  });

  function renderQuestionTagQuestions(questionTag) {
    const url = "/api/question/" + questionTag;
    console.log(url);
    $.get(url, function() {
      //  ("index", { questions: data });
    });
  }
});
