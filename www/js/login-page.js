"use strict";

let users;
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

fetch('./users.json')
  .then((response) => response.json())
  .then((json) => users = json);

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    let idx = 0
    let userFound = false;

    while (idx < users.length) {
      if (users[idx].username.toLowerCase() === username.toLowerCase()) {
        userFound = true;
        break;
      }
      idx++;
    } 

    if (!userFound) {
      loginErrorMsg.style.opacity = 1;
    } else if (users[idx].failedAttempts >= 3) {
      loginErrorMsg.innerHTML = 'Your account has been locked due to due many failed login attempts. Please contact the customer support team for assistance.';
      loginErrorMsg.style.opacity = 1;
    } else if (users[idx].username.toLowerCase() === username.toLowerCase() && users[idx].password === password) {
        if (users[idx].isAdmin === 1) window.location.href = './admin-home.html';
        else window.location.href = './user-home.html';
    } else {
        loginErrorMsg.style.opacity = 1;
        users[idx].failedAttempts++;
    }
})