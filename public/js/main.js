// const $allQuestionContainer = $(".allQuestion");
$(document).ready(function() {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  //filter questions by questiontag

  $(".QTag").click(function(event) {
    const questionTag = event.target.id;
    console.log(questionTag + "clicked");
    renderQuestionTagQuestions(questionTag);
  });

  function renderQuestionTagQuestions(questionTag) {
    const url = "/question/" + questionTag;
    console.log(url);
    window.location.href = url;
  }
});
