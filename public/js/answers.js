$(document).ready(function() {
  let userId;
  $.get("/api/user_data").then(function(data) {
    userId = data.id;
  });

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
