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

  // let numAnswers = $(".answerText").length;
  // let textboxArray = [];
  // for (let i = 1; i <= numAnswers; i++) {
  //   textboxArray[i] = new SimpleMDE({
  //     element: $(`#answerText${i}`)[0],
  //     placeholder: "Type markdown here...",
  //     showIcons: ["code", "table"],
  //     hideIcons: ["side-by-side"]
  //   });
  //   element = `#answerText${i}`;
  //   console.log("this is the element", $(element));
  // }

  $(".answerText").each(function() {
    var simplemde = new SimpleMDE({
      element: this
    });
    simplemde.render();
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
