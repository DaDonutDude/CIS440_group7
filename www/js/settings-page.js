"use strict";

let user;
let settingsNameLabel = document.getElementById("name");
let orgLabel = document.getElementById("organization");
let currentPasswordField = document.getElementById("current-password");
let newPasswordField = document.getElementById("new-password");
const passwordResetButton = document.getElementById("new-pw-submit");
const logoutButton = document.getElementById("logout-button");

if (sessionStorage.getItem('admin')) {
    document.getElementById('home-button').href = './admin-home.html';
}

$.ajax({
    type: "POST",
    url: './php/settings-mysql.php',
    dataType: 'json',
    async: false,
    data: {functionname: 'getUser', arguments: [sessionStorage.getItem('token')]},
    success: function (obj, textstatus) {
                  if( !('error' in obj) ) {
                        user = obj.result;
                        // this grabs the first & last name variables and displays it next to the name label, therefore displaying the user's name
                        // i would like for it to grab the user's first and last name from the database and display
                        settingsNameLabel.innerHTML += " " + user[0][1] + " " + user[0][2];

                        // this grabs the organization variable and displays it next to the organization label, therefore displaying the user's org
                        // i would like for it to grab the user's org from the database and display
                        orgLabel.innerHTML += " " + user[0][3];
                  }
                  else {
                      console.log(obj.error);
                  }
            }
  });


// this brings the user back to the login page and resets session storage, essentially "logging" them out
logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = './login-page.html';
});


// this checks the current and new password fields everytime the button is pressed
passwordResetButton.addEventListener("click", (e) => {
    e.preventDefault();

    // these variables grab user inputs from the current and new password field and assign it to variables
    const currentPassword = currentPasswordField.value;
    const newPassword = newPasswordField.value;

    // checking to make sure the current password that the user entered matches their password tied to their account in the "database"
    if (currentPassword !== user[0][0]) {
        alert("Must enter correct current password to update new password.");
        clearPasswordFields();
        return;
    }
    // checking to make sure that the new password the user input has a length greater than 0
    if (newPassword.length == 0) {
        alert("New password must be length greater than 0.");
        clearPasswordFields();
        return;
    }
    // checking to make sure that the new password they entered does not match their current password
    if (currentPassword === newPassword) {
        alert("Password cannot be the same as current password.");
        clearPasswordFields();
        return;
    }
    // if all requirements met, we change the user's password in the database to the new password they input
    user[0][0] = newPassword;
    $.ajax({
        type: "POST",
        url: './php/settings-mysql.php',
        dataType: 'json',
        data: {functionname: 'updatePassword', arguments: [sessionStorage.getItem('token'), user[0][0]]},
        success: function (obj, textstatus) {
                      if( ('error' in obj) ) console.log(obj.error);
                }
      });
    console.log(currentPassword + " has now been updated to: " + newPassword);
    alert("Password successfully updated!");
    clearPasswordFields();
});


// function to clear the password input fields after successfully changing password
function clearPasswordFields() { 
    currentPasswordField.value = "";
    newPasswordField.value = "";
}

