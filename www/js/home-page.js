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
const homepageNameLabel = document.getElementById("home-name");
const userTotalPoints = document.getElementById("total-points");

// this grabs the first & last name variables and displays it after 'welcome', therefore displaying the user's name
// i would like for it to grab the user's first and last name from the database and display
homepageNameLabel.innerHTML = users.firstname + " " + users.lastname;

// this grabs the user's points variable and displays it next to the total points label, therefore displaying the user's total points
// i would like for it to grab the user's total points from the database and display
userTotalPoints.innerHTML = users.points;