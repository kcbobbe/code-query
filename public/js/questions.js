$(document).ready(function() {
  const socket = io();
  //message from server
  socket.on("newPost", msg => {
    outputMessage(msg);
    //Auto scroll down
    $(".allQuestion").scrollTop = $(".allQuestion").scrollHeight;
  });

  let userId;
  $.get("/api/user_data").then(function(data) {
    userId = data.id;
  });

  //potential fix for serveral textboxes being created
  $("#questionText").empty();

  let simplemde = new SimpleMDE({
    element: $("#questionText")[0],
    placeholder: "Type markdown here...",
    showIcons: ["code", "table"],
    hideIcons: ["side-by-side"]
  });

  // simplemde.value("Write your question here");

  $("#questionForm").on("submit", function(event) {
    event.preventDefault();
    console.log(userId);

    let selectedTag = $("#questionTag")
      .children("option:selected")
      .val();

    let newQuestion = {
      questionText: simplemde.value().trim(),
      questionTag: selectedTag,
      UserId: userId
    };

    $.ajax("/api/questions", {
      type: "POST",
      data: newQuestion
    }).then(function() {
      console.log("created new question");
      //Broadcast the question
      socket.emit("newPost", newQuestion);
      location.reload();
    });
  });
  //onclick view replies
  $(".viewReplies").on("click", event => {
    event.preventDefault();
    let dataId = $(event.target).attr("data-id");
    $(`#repliesContainer${dataId}`).css("display", "block");
    $("#noReplies").css("display", "none");
  });

  $(".hideReplies").on("click", event => {
    event.preventDefault();
    let dataId = $(event.target).attr("data-id");
    $(`#repliesContainer${dataId}`).css("display", "none");
    console.log($(`#repliesContainer${dataId}`));
  });

  $(".showReplyForm").on("click", event => {
    event.preventDefault();
    let dataId = $(event.target).attr("data-id");
    $(`#replyForm${dataId}`).css("display", "block");
    console.log($(`#replyForm${dataId}`));
  });

  //Output message on DOM
  function outputMessage(msg) {
    console.log("got new event" + msg);
    location.reload();
  }
});
