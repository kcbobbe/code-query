$(function() {
  $("#questionForm").on("submit", function(event) {
    event.preventDefault();
    let selectedTag = $("#questionTag")
      .children("option:selected")
      .val();

    let newQuestion = {
      questionText: $("#questionText")
        .val()
        .trim(),
      questionTag: selectedTag,
      UserId: 1
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
