$(document).ready(function() {
  $.get("/api/user_data", function(req) {
    if (req.id) {
      // The user is not logged in, send back an empty object
      $("#logoutButton").css("display");
      $("#loginButton").css("display", "none");
      $("#signupButton").css("display", "none");
      $("#askQuestion").css("display", "");
      $(".replyButton").css("display", "");
    } else {
      $("#logoutButton").css("display", "none");
      $("#loginButton").css("display");
      $("#signupButton").css("display");
      $("#askQuestion").css("display", "none");
      $(".replyButton").css("display", "none");
    }
    $(".memberSection").click(function() {
      console.log("member clicked");
      //need to get userID of current user
      const CurrentUser = req.id;
      console.log(CurrentUser + "clicked");
      renderMemberQuestion(CurrentUser);
    });
    $(".userUsername").click(function(event) {
      console.log(event.target);
      // let user = event.target.UserId;
      // console.log(user + "clicked");
      // renderMemberQuestion(user);
    });
    function renderMemberQuestion(UserId) {
      const url = "/member/" + UserId;
      console.log(url);
      window.location.href = url;
      $("#askQuestion").css("display", "none");
    }
  });
});
