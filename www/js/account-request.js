"use strict";

let users;
let emailDomains;
let pendingAccounts = [];
const newForm = document.getElementById("new-form");
const newButton = document.getElementById("new-form-submit");
const newErrorMsg = document.getElementById("new-error-msg");
const validChars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9',];


$.ajax({
  type: "POST",
  url: './php/ar-mysql.php',
  dataType: 'json',
  data: {functionname: 'getUsers'},
  success: function (obj, textstatus) {
                if( !('error' in obj) ) {
                    users = obj.result;
                }
                else {
                    console.log(obj.error);
                }
          }
});

$.ajax({
  type: "POST",
  url: './php/ar-mysql.php',
  dataType: 'json',
  data: {functionname: 'getEmailDomains'},
  success: function (obj, textstatus) {
                if( !('error' in obj) ) {
                  emailDomains = obj.result;
                }
                else {
                    console.log(obj.error);
                }
          }
});

$.ajax({
  type: "POST",
  url: './php/ar-mysql.php',
  dataType: 'json',
  data: {functionname: 'getPendingAccounts'},
  success: function (obj, textstatus) {
                if( !('error' in obj) ) {
                  pendingAccounts = obj.result;
                }
                else {
                    console.log(obj.error);
                }
          }
});

newButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = newForm.username.value;
    const password = newForm.password.value;
    const firstName = newForm.firstname.value;
    const lastName = newForm.lastname.value;
    const email = newForm.email.value;
    
    let accountAlreadyRequested = false;
    let userFound = false;
    let emailFound = false;
    let validUsername = true;
    let validEmailDomain = false;

    
    for (let idx = 0; idx < pendingAccounts.length; idx++) {
      if (pendingAccounts[idx][0].toLowerCase() === username.toLowerCase() || pendingAccounts[idx][1].toLowerCase() === email.toLowerCase()) {
        accountAlreadyRequested = true;
        break;
      }
    }

    for (let idx = 0; idx < users.length; idx++) {
      if (users[idx][0].toLowerCase() === username.toLowerCase()) {
        userFound = true;
        break;
      } else if (users[idx][1].toLowerCase() === email.toLowerCase()) {
        emailFound = true;
        break;
      }
    }

    for (let idx = 0; idx < username.length; idx++) {
        validUsername = validChars.includes(username.charAt(idx).toLowerCase())
        if (!validUsername) break;
    }

    for (let idx = 0; idx < emailDomains.length; idx++) {
        validEmailDomain = email.includes(emailDomains[idx][0].toLowerCase());
        if (!validEmailDomain) break;
    }

    if (userFound) {
        document.getElementById("new-error-msg").innerHTML = 'An account with that username already exists!'
        newErrorMsg.style.opacity = 1;
    } else if (accountAlreadyRequested) {
      document.getElementById("new-error-msg").innerHTML = 'An account has already been requested with this username or email!'
        newErrorMsg.style.opacity = 1;
    } else if (emailFound) {
      document.getElementById("new-error-msg").innerHTML = 'An account with that email already exists!'
        newErrorMsg.style.opacity = 1;
    } else if (!validUsername) {
        newErrorMsg.innerHTML = 'Your username must consist of alphanumeric characters only!';
        newErrorMsg.style.opacity = 1;
    } else if (!validEmailDomain) {
        newErrorMsg.innerHTML = "Your email domain isn't registered in our database!";
        newErrorMsg.style.opacity = 1;
    } else {
      $.ajax({
        type: "POST",
        url: './php/ar-mysql.php',
        dataType: 'json',
        data: {functionname: 'writePendingAccounts', arguments: [username, password, firstName, lastName, email, 0, 0, 0]},
        success: function (obj, textstatus) {
                      if( ('error' in obj) ) console.log(obj.error);
                }
      });
        window.location.href = './new-account-confirmation.html';
      }
    }
)