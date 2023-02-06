"use strict";

let users;
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

$.ajax({
  type: "POST",
  url: './php/login-mysql.php',
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

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    let idx = 0
    let userFound = false;

    while (idx < users.length) {
      if (users[idx][0].toLowerCase() === username.toLowerCase()) {
        userFound = true;
        break;
      }
      idx++;
    } 

    if (!userFound) {
      loginErrorMsg.style.opacity = 1;
    } else if (users[idx][2] >= 3) {
      loginErrorMsg.innerHTML = 'Your account has been locked due to due many failed login attempts. Please contact the customer support team for assistance.';
      loginErrorMsg.style.opacity = 1;
      $.ajax({
        type: "POST",
        url: './php/login-mysql.php',
        dataType: 'json',
        data: {functionname: 'lockAccount', arguments: [username]},
        success: function (obj, textstatus) {
                      if( ('error' in obj) ) console.log(obj.error);
                }
      });
    } else if (users[idx][0].toLowerCase() === username.toLowerCase() && users[idx][1] === password) {
        if (users[idx][3] == 1) window.location.href = './admin-home.html';
        else window.location.href = './user-home.html';
    } else {
        loginErrorMsg.style.opacity = 1;
        users[idx][2]++;
    }
})