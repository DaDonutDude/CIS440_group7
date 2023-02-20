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

//this is a dummy variable that shows which surveys the user has completed
completedSurvey[username]['surveysCompleted'] = [1,3];
// filler text for the available surveys field
let availableSurveysText = "Surveys available:<br>";
// boolean to check whether all surveys have been taken or not
let allSurveysTaken = true


// checks if the survey has completed survey type 1; addss the multiple choice text to the available surveys text variable and changes allSurveysTaken to false
if (!(completedSurvey[username]['surveysCompleted'] || []).includes(1)){
    
    availableSurveysText = availableSurveysText + "<br>Multiple Choice "
    allSurveysTaken = false
}
// checks if the survey has completed survey type 2; addss the numerical scale text to the available surveys text variable and changes allSurveysTaken to false
if (!(completedSurvey[username]['surveysCompleted'] || []).includes(2)){

    availableSurveysText = availableSurveysText + "<br>Numerical Scale "
    allSurveysTaken = false
}
// checks if the survey has completed survey type 3; addss the short answer text to the available surveys text variable and changes allSurveysTaken to false
if (!(completedSurvey[username]['surveysCompleted'] || []).includes(3)){
    
    availableSurveysText = availableSurveysText + "<br>Short Answer "
    allSurveysTaken = false
}

// checks to see if allSurveysTaken is still true and if it is changes the surveys text variable to show they have no available surveys
if (allSurveysTaken == true){
    availableSurveysText = "You've completed all available surveys!"
}

//changes the available survey field to the text variable
availableSurveys.innerHTML = availableSurveysText


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


