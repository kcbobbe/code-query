$(document).ready(function() {
  $.get("/api/user_data", function(req) {
    if (req.id) {
      // The user is not logged in, send back an empty object
      $(".yourProfile").removeClass("hide")
      $("#logoutButton").removeClass("hide");
      $("#loginButton").addClass("hide");
      $("#signupButton").addClass("hide");
      $("#askQuestion").removeClass("hide");
      $(".replyButton").removeClass("hide");
    } else {
      $("#yourProfile").addClass("hide")
      $("#logoutButton").addClass("hide");
      $("#loginButton").removeClass("hide");
      $("#signupButton").removeClass("hide");
      $("#askQuestion").addClass("hide");
      $(".replyButton").addClass("hide");
    }
    $(".memberSection").on("click", event => {
      event.preventDefault();
      //Get userID of current user
      const CurrentUser = req.id;
      renderMemberQuestion(CurrentUser);
      $("#askQuestion").addClass("hide");
    });
    $(".userUsername").on("click", event => {
      event.preventDefault();
      let userId = $(event.target)
        .parent()
        .attr("data-user");
      // console.log(userId)
      renderMemberQuestion(userId);
      $("#askQuestion").addClass("hide");
    });
    function renderMemberQuestion(UserId) {
      const url = "/member/" + UserId;
      window.location.href = url;
    }

    // adding delete button functionality
    $(".userUsername").each(function() {
      if (parseInt($(this).data("user")) === parseInt(req.id)) {
        $(this).addClass("activeUser");
      }
    });
    //For each question checking to see if the question belongs to current user then rendering 'Delete' button
    $(".question").each(function() {
      if (parseInt($(this).data("user")) === parseInt(req.id)) {
        let questionId = $(this).data("id");
        let newDeleteButton = $("<a>");
        newDeleteButton.text("Delete");
        newDeleteButton.addClass("delete-button button is-danger");
        newDeleteButton.attr("data-id", questionId);
        //Adding delete button in the card and calling AJAX delete if pressed
        $(this).append(newDeleteButton);

        $(".delete-button").each(() => {
          let qid = $(this).attr("data-id");
          $(".delete-button").on("click", () => {
            $.ajax(`/api/questions/${qid}`, {
              type: "DELETE"
            }).then(() => {
              location.reload();
            });
          });
        });
      }
    });
  });
});
