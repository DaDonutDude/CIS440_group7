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

let feedbackID = 0;

// dummy users database
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

// dummy feedback database
const feedback = {};

// dummy completed surveys database
const completedSurvey = {};
completedSurvey[username] = {};

// grabbing elements from the homepage and assigning to variables
const homepageNameLabel = document.getElementById("home-name");
const userTotalPoints = document.getElementById("total-points");
const logoutButton = document.getElementById("logout-button");
const feedbackButton = document.getElementById("submit-feedback-button");
const currentFeedbackField = document.getElementById("feedback-textarea");
const availableSurveys = document.getElementById("available-surveys")

// this grabs the first & last name variables and displays it after 'welcome', therefore displaying the user's name
// i would like for it to grab the user's first and last name from the database and display
homepageNameLabel.innerHTML = users.firstname + " " + users.lastname;

// this grabs the user's points variable and displays it next to the total points label, therefore displaying the user's total points
// i would like for it to grab the user's total points from the database and display
userTotalPoints.innerHTML = users.points;

// available surveys text section: I would like the server side function to able to check what surveys the current logged in user has completed (through the completed surveys table?) and then display text according to which ones they have no completed

let surveys = [
    {
        id: 1, surveytype: 'MC', surveypoints: 50, survey: "This is a MC question"
    },
    {
        id: 2, surveytype: 'NS', surveypoints: 50, survey: "This is a NS question"
    },
    {
        id: 3, surveytype: 'SA', surveypoints: 50, survey: "This is a SA question"
    }
];

let surveyTypeButtons = document.getElementById("surveyTypeButtons");
		for (let i = 0; (i < surveys.length && i < 5); i++) {
		  let button = document.createElement("button");
		  button.innerHTML = surveys[i].surveytype;
		  button.onclick = function() {
            window.location.href = "survey-page.html";
            //alert("Survey Type: " + surveys[i].surveytype);
		  };
		  surveyTypeButtons.appendChild(button);
		}



// this listens for the user to click the 'submit feedback' button and then adds it to the feedback dictionary as "answer". it also takes the feedbackID and increments it by 1 and adds it to the feedback dictionary as "feedbackID"
// i would like this to save whatever is in the feedbackField into the Feedback database while also checking to see what the last feedbackID is and incrementing by 1 before adding 
feedbackButton.addEventListener("click", (e) => {
    e.preventDefault();

    feedback['answer'] = currentFeedbackField.value;
    feedbackID++;
    feedback['feedbackID'] = feedbackID;
    console.log(feedback['answer']);
    console.log(feedback['feedbackID']);
});

// this listens for the user to click the 'logout' button and then takes the user back to the login page while also clearing sessionStorage
logoutButton.addEventListener("click", (event) => {
    sessionStorage.clear();
});


