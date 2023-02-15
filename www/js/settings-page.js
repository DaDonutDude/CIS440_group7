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

const settingsNameLabel = document.getElementById("name");
const orgLabel = document.getElementById("organization");
const currentPasswordField = document.getElementById("current-password");
const newPasswordField = document.getElementById("new-password");
const passwordResetButton = document.getElementById("new-pw-submit");

// 
settingsNameLabel.innerHTML += " " + users.firstname + " " + users.lastname;
orgLabel.innerHTML += " " + users.organization;

//
passwordResetButton.addEventListener("click", (e) => {
    e.preventDefault();

    const currentPassword = currentPasswordField.value;
    const newPassword = newPasswordField.value;
    if (currentPassword !== users.password) {
        alert("Must enter correct current password to update new password.");
        clearPasswordFields();
        return;
    }
    if (newPassword.length == 0) {
        alert("New password must be length greater than 0.");
        clearPasswordFields();
        return;
    }
    if (currentPassword === newPassword) {
        alert("Password cannot be the same as current password.");
        clearPasswordFields();
        return;
    }
    users.password = newPassword;
    console.log(currentPassword + " has now been updated to: " + newPassword);
    alert("Password successfully updated!!!1!!11");
    clearPasswordFields();
});

function clearPasswordFields() { 
    currentPasswordField.value = "";
    newPasswordField.value = "";
}

