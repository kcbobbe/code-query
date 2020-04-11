$(document).ready(function() {
  //connecting with socket
  const socket = io();
  //message from server
  socket.on("newPost", msg => {
    outputMessage(msg);
    //Auto scroll down
    $(".allQuestion").scrollTop = $(".allQuestion").scrollHeight;
  });
  //getting userid who is logged in
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
    let selectedTag = $("#questionTag")
      .children("option:selected")
      .val();
    //Creating the new question object to add into the database
    let newQuestion = {
      questionText: simplemde.value().trim(),
      questionTag: selectedTag,
      UserId: userId
    };

    $.ajax("/api/questions", {
      type: "POST",
      data: newQuestion
    }).then(function() {
      //Broadcast the question using socket
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
  //onlick hide replies
  $(".hideReplies").on("click", event => {
    event.preventDefault();
    let dataId = $(event.target).attr("data-id");
    $(`#repliesContainer${dataId}`).css("display", "none");
    console.log($(`#repliesContainer${dataId}`));
  });
  //onclick 'reply' a reply form will show up
  $(".showReplyForm").on("click", event => {
    event.preventDefault();
    let dataId = $(event.target).attr("data-id");
    $(`#replyForm${dataId}`).css("display", "block");
    console.log($(`#replyForm${dataId}`));
  });

  //Output message on DOM coming from socket.io
  function outputMessage(msg) {
    console.log(msg);
    location.reload();
  }
});
