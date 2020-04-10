$(document).ready(function() {
  $.get("/api/user_data", function(req) {
    if (req.id) {
      // The user is not logged in, send back an empty object
      $("#logoutButton").removeClass("hide");
      $("#loginButton").addClass("hide");
      $("#signupButton").addClass("hide");
      $("#askQuestion").removeClass("hide");
      $(".replyButton").removeClass("hide");
    } else {
      $("#logoutButton").addClass("hide");
      $("#loginButton").removeClass("hide");
      $("#signupButton").removeClass("hide");
      $("#askQuestion").addClass("hide");
      $(".replyButton").addClass("hide");
    }
    $(".memberSection").on("click", event => {
      event.preventDefault();
      console.log("member clicked");
      //need to get userID of current user
      const CurrentUser = req.id;
      console.log(CurrentUser + "clicked");
      renderMemberQuestion(CurrentUser);
    });
    $(".userUsername").on("click", event => {
      event.preventDefault();
      let userId = $(event.target)
        .parent()
        .attr("data-user");
      // console.log(userId)
      renderMemberQuestion(userId);
    });
    function renderMemberQuestion(UserId) {
      const url = "/member/" + UserId;
      console.log(url);
      window.location.href = url;
      $("#askQuestion").css("display", "none");
    }

    // adding delete button functionality
    $(".userUsername").each(function() {
      console.log(this);
      if (parseInt($(this).data("user")) === parseInt(req.id)) {
        console.log("matches");
        $(this).addClass("activeUser");
      }
    });

    $(".question").each(function() {
      console.log(this);
      if (parseInt($(this).data("user")) === parseInt(req.id)) {
        console.log("matches q");
        // // this.addClass("activeUser");
        // const deleteFunction = qid => {
        //   $.ajax(`/api/questions/${qid}`, {
        //     type: "DELETE"
        //   }).then(() =>{
        //     // console.log("deleted comment", questionId);
        //     location.reload();
        //   });
        // };
        let questionId = $(this).data("id");
        let newDeleteButton = $("<a>");
        newDeleteButton.text("Delete");
        newDeleteButton.addClass("delete-button");
        newDeleteButton.attr("data-id", questionId);
        console.log(newDeleteButton);

        // newDeleteButton.attr("onclick", deleteFunction(questionId));
        // newDeleteButton.attr("onclick", deleteFunction(questionId));

        $(this).append(newDeleteButton);
        // delete
        $(".delete-button").each(() => {
          let qid = $(this).attr("data-id");
          $(this).on("click", () => {
            $.ajax(`/api/questions/${qid}`, {
              type: "DELETE"
            }).then(() => {
              // console.log("deleted comment", questionId);
              location.reload();
            });
          });
        });
      }
    });

    //   $(".deleteButton").on("click", (event) =>{
    //     event.preventDefault();
    //     $.delete("/api/user_data", function(req) {
    //   })
  });
});
