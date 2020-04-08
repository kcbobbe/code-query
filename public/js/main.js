// const $allQuestionContainer = $(".allQuestion");

$(document).ready(function() {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  $("#HTMLTag").click(function() {
    const questionTag = "HTML";
    console.log(questionTag);
    renderQuestionTagQuestions(questionTag);
  });

  $("#CSSTag").click(function() {
    const questionTag = "CSS";
    console.log(questionTag);
    renderQuestionTagQuestions(questionTag);
  });

  $("#JSTag").click(function() {
    const questionTag = "JavaScript";
    console.log(questionTag);
    renderQuestionTagQuestions(questionTag);
  });

  function renderQuestionTagQuestions(questionTag) {
    const url = "/question/" + questionTag;
    console.log(url);
    window.location.href = url;
    //render questions display in index.handlebars in questions

    // $.get(url, function() {

    //   //   //  ("index", { questions: data });
    //   // });
  }
});
