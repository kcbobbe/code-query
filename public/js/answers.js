$(document).ready(function() {
  let userId;
  $.get("/api/user_data").then(function(data) {
    userId = data.id;
  });

  let numAnswers = $(".answerText").length;
  let textboxArray = [];
  for (let i = 1; i <= numAnswers; i++) {
    textboxArray[i] = new SimpleMDE({ element: $(`#answerText${i}`)[0] });
    element = `#answerText${i}`;
    console.log("this is the element", $(element));
    textboxArray[i].value("write your answer here");
  }

  $(".answerForm").on("submit", function(event) {
    event.preventDefault();
    let questionId = parseInt($(event.target).attr("data-id"));
    let newAnswer = {
      answerText: $(`#answerText${questionId}`)
        .val()
        .trim(),
      // answerTag: "JavaScript",
      QuestionId: questionId,
      UserId: userId
    };

    $.ajax("/api/answers", {
      type: "POST",
      data: newAnswer
    }).then(function() {
      console.log("created new answer");
      location.reload();
    });
  });
});
