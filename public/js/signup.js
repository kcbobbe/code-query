$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var usernameInput = $("input#username-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the username and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      $("#alert .msg").text("**Username and password required");
      $("#alert").fadeIn(500);
      return;
    }
    // If we have an username and password, run the signUpUser function
    signUpUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, password) {
    $.post("/api/signup", {
      username: username,
      password: password
    })
      .then(function() {
        window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  //Displaying message if the username already exists!
  function handleLoginErr(err) {
    console.log(err);
    $("#alert .msg").text("  Username exists!");
    $("#alert").fadeIn(500);
    return;
  }
});
