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
  });
});
