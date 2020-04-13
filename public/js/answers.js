$(document).ready(function() {
  const socket = io();
  //message from server
  socket.on("newPost", msg => {
    outputMessage(msg);
  });

  let userId;
  $.get("/api/user_data").then(function(data) {
    userId = data.id;
  });

  $(".answerText").empty();

  $(".answerText").each(function() {
    var simplemde = new SimpleMDE({
      element: this,
      placeholder: "Type markdown here...",
      showIcons: ["code", "table"],
      hideIcons: ["side-by-side"]
    });
    simplemde.render();
  });
  // On submit answer creating answer object and calling AJAX post call
  $(".answerForm").on("submit", function(event) {
    event.preventDefault();
    let questionId = parseInt($(event.target).attr("data-id"));
    let newAnswer = {
      answerText: $(`#answerText${questionId}`)
        .val()
        .trim(),
      QuestionId: questionId,
      UserId: userId
      // AnswerUsername: answerUsername
    };

    $.ajax("/api/answers", {
      type: "POST",
      data: newAnswer
    }).then(function() {
      console.log("created new answer");
      //Broadcast the question
      socket.emit("newPost", newAnswer);
      location.reload();
    });
  });

  //Output message on DOM
  function outputMessage(msg) {
    console.log("got new event" + msg);
    location.reload();
  }
});
