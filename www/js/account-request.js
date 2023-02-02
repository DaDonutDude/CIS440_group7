"use strict";

let users;
let emailDomains;
let pendingAccounts = [];
const newForm = document.getElementById("new-form");
const newButton = document.getElementById("new-form-submit");
const newErrorMsg = document.getElementById("new-error-msg");
const validChars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9',];

fetch('./users.json')
  .then((response) => response.json())
  .then((json) => users = json);

fetch('./emaildomains.json')
  .then((response) => response.json())
  .then((json) => emailDomains = json);

newButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = newForm.username.value;
    const password = newForm.password.value;
    const firstName = newForm.firstname.value;
    const lastName = newForm.lastname.value;
    const email = newForm.email.value;
    
    let userFound = false;
    let emailFound = false;
    let validUsername = true;
    let validEmailDomain = false;

    for (let idx = 0; idx < users.length; idx++) {
      if (users[idx].username === username) {
        userFound = true;
        break;
      } else if (users[idx].email === email) {
        emailFound = true;
        break;
      }
    }

    for (let idx = 0; idx < username.length; idx++) {
        validUsername = validChars.includes(username.charAt(idx).toLowerCase())
        if (!validUsername) break;
    }

    for (let idx = 0; idx < emailDomains.length; idx++) {
        validEmailDomain = email.includes(emailDomains[idx]);
        if (!validEmailDomain) break;
    }

    if (userFound) {
        document.getElementById("new-error-msg").innerHTML = 'An account with that username already exists!'
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
        if (sessionStorage.getItem('pendingAccounts') != null) {
          pendingAccounts = JSON.parse(sessionStorage.getItem('pendingAccounts'));
        }
        pendingAccounts.push({
          "username": username,
          "password": password,
          "firstname": firstName,
          "lastname": lastName,
          "email": email,
          "failedAttempts": 0,
          "isAdmin": 0
        })
        sessionStorage.setItem('pendingAccounts', JSON.stringify(pendingAccounts));
        window.location.href = './new-account-confirmation.html';
      }
    }
)