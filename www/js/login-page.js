"use strict";

//let users;
let surveys_ready = 1;
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const surveyButton = document.getElementById("survey_button");
let idx = 0


//Defines Variables we'll need
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


//Creates the variables we'll user for the demo
const users = []
users[0] = username;
users[1] = password;
//first name
users[2] = fname;
//last name
users[3] = lname;
users[4] = email;
//points
users[5] = points;
//failed attempts
users[6] = f_attempts;
//is admin
users[7] = adm_status;
users[8] = org;


/* WORKING CODE
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

    username = loginForm.username.value;
    password = loginForm.password.value;



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
    } else if (users[idx][0].toLowerCase() === username.toLowerCase() && users[idx][1] === password) {
        //hides login page
        document.getElementById("login_page").style.display = "none";
        //sessionStorage.setItem('token', username);
        if (users[idx][3] == 1) {
          document.getElementById("admin_home").style.display = "inline";
          document.getElementById("a_personalized_intro").innerHTML = "Hello Admin " + username +"!";
        }
        //else window.location.href = './user-home.html';
        else{
          document.getElementById("user_home").style.display = "block";
          document.getElementById("u_personalized_intro").innerHTML = "Hello " + username +"!";
          document.getElementById("user_settings_button").style.display = "inline";

          if (surveys_ready > 0) {
            document.getElementById("survey_button").style.display = "inline";
          }

        }


    } else {
        loginErrorMsg.style.opacity = 1;
        users[idx][2]++;
        if (users[idx][2] >= 3) {
          $.ajax({
            type: "POST",
            url: './php/login-mysql.php',
            dataType: 'json',
            data: {functionname: 'lockAccount', arguments: [username]},
            success: function (obj, textstatus) {
                          if( ('error' in obj) ) console.log(obj.error);
                    }
          });
        }
    }
})
*/

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  username = loginForm.username.value;
  password = loginForm.password.value;

  while (idx < users.length) {
    if (users[0].toLowerCase() === username.toLowerCase()) {
      userFound = true;
      break;
    }
    idx++;
  } 

  if (!userFound) {
    loginErrorMsg.style.opacity = 1;
  } else if (users[6] >= 3) {
    loginErrorMsg.innerHTML = 'Your account has been locked due to due many failed login attempts. Please contact the customer support team for assistance.';
    loginErrorMsg.style.opacity = 1;
  } else if (users[0].toLowerCase() === username.toLowerCase() && users[1] === password) {

      //hides login page


      //if admin - launch admin page
      if (users[5] == 1) {

      }
      //otherwise go to user home page
      else{

        if (surveys_ready > 0) {

        }

      }

  } else {
      /*loginErrorMsg.style.opacity = 1;
      users[idx][2]++;
      if (users[idx][2] >= 3) {
        $.ajax({
          type: "POST",
          url: './php/login-mysql.php',
          dataType: 'json',
          data: {functionname: 'lockAccount', arguments: [username]},
          success: function (obj, textstatus) {
                        if( ('error' in obj) ) console.log(obj.error);
                  }
        });
      }*/
  }
})



