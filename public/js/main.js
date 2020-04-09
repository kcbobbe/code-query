// const $allQuestionContainer = $(".allQuestion");
// const socket = io();
$(document).ready(function() {
  const socket = io();
  socket.on("msg", message => {
    console.log(message);
  });
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

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