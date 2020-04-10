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
      let userId = $(event.target).parent().attr("data-id");
      // console.log(userId)
      renderMemberQuestion(userId);
    });
    function renderMemberQuestion(UserId) {
      const url = "/member/" + UserId;
      console.log(url);
      window.location.href = url;
      $("#askQuestion").css("display", "none");
    }
  });
});
