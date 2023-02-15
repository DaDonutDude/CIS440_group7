"use strict";
let userFound = false;
let username = "user";
let password = "password";
let fname = "USER";
let lname = "DEMO";
let email = "demo.user@asu.edu";
let points = 50;
let f_attempts = 0;
let adm_status = 0;
let org = "ASU";

const users = {};
users['username'] = username;
users['password'] = password;
//first name
users['firstname'] = fname;
//last name
users['lastname'] = lname;
users['email'] = email;
//points
users['points'] = points;
//failed attempts
users['failedAttempts'] = f_attempts;
//is admin  
users['adminStatus'] = adm_status;
users['organization'] = org;

// dummy user variables 

const settingsNameLabel = document.getElementById("name");
const orgLabel = document.getElementById("organization");
const currentPasswordField = document.getElementById("current-password");
const newPasswordField = document.getElementById("new-password");
const passwordResetButton = document.getElementById("new-pw-submit");

// this grabs the first & last name variables and displays it next to the name label, therefore displaying the user's name
// i would like for it to grab the user's first and last name from the database and display
settingsNameLabel.innerHTML += " " + users.firstname + " " + users.lastname;

// this grabs the organization variable and displays it next to the organization label, therefore displaying the user's org
// i would like for it to grab the user's org from the database and display
orgLabel.innerHTML += " " + users.organization;

// this checks the current and new password fields everytime the button is pressed
passwordResetButton.addEventListener("click", (e) => {
    e.preventDefault();

    // these variables grab user inputs from the current and new password field and assign it to variables
    const currentPassword = currentPasswordField.value;
    const newPassword = newPasswordField.value;

    // checking to make sure the current password that the user entered matches their password tied to their account in the "database"
    if (currentPassword !== users.password) {
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
    users.password = newPassword;
    console.log(currentPassword + " has now been updated to: " + newPassword);
    alert("Password successfully updated!");
    clearPasswordFields();
});


// function to clear the password input fields after successfully changing password
function clearPasswordFields() { 
    currentPasswordField.value = "";
    newPasswordField.value = "";
}

