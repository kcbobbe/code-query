$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  let userId;
  let userQuestions = [];

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.username);
    userId = data.id;
    $.get("/api/questions").then(data => {
      data.forEach(question => {
        if (question.UserId === userId) {
          console.log(question);
          userQuestions.push(question);
        }
      });
    });
    // $.get("/api/questions")
    //   .then(function(data))
    // we can use this array to display questions on members page
    console.log(userQuestions);
  });
});
