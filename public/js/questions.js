$(document).ready(function() {
  let userId;
  $.get("/api/user_data").then(function(data) {
    userId = data.id;
  });

  $("#questionForm").on("submit", function(event) {
    event.preventDefault();
    console.log(userId);

    let selectedTag = $("#questionTag")
      .children("option:selected")
      .val();

    let newQuestion = {
      questionText: $("#questionText")
        .val()
        .trim(),
      questionTag: selectedTag,
      UserId: userId
    };

    $.ajax("/api/questions", {
      type: "POST",
      data: newQuestion
    }).then(function() {
      console.log("created new question");
      location.reload();
    });
  });
  //onclick view replies
  $(".viewReplies").on("click", event => {
    event.preventDefault();
    let parentElement = $(event.target).parent().parent().parent().parent();
    console.log(parentElement)
    console.log(parentElement.attr("data-id"))
    let dataId = parentElement.attr("data-id")
    // if ($(`#repliesContainer${dataId}`).hasClass("hide")) {
      $(`#repliesContainer${dataId}`).css("display", "block");
      console.log($(`#repliesContainer${dataId}`))
      // console.log("show")
    // } else {
      // $(`#repliesContainer${dataId}`).addClass("hide");
      // console.log("hide")
    // }
  });

  $(".hideReplies").on("click", event => {
    event.preventDefault();
    let parentElement = $(event.target).parent().parent().parent();
    console.log(parentElement)
    console.log(parentElement.attr("data-id"))
    let dataId = parentElement.attr("data-id")
      $(`#repliesContainer${dataId}`).css("display", "none");
      console.log($(`#repliesContainer${dataId}`))
  });

  $(".showReplyForm").on("click", event => {
    event.preventDefault();
    let parentElement = $(event.target).parent().parent().parent().parent();
    console.log(parentElement)
    console.log(parentElement.attr("data-id"))
    let dataId = parentElement.attr("data-id")
      $(`#replyForm${dataId}`).css("display", "block");
      console.log($(`#replyForm${dataId}`))
  });

  // $(".viewReplies").on("click", event => {
  //   event.preventDefault();
  //   $("#req")
  //   repliesContainer.css("display", "inline-block");
  // });
});
