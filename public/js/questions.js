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
});
