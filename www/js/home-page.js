"use strict";
let userFound = false;
let user;
let completedSurveys;
let surveys;
let feedback;
let username = sessionStorage.getItem('token');
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

$.ajax({
    type: "POST",
    url: './php/home-page-mysql.php',
    dataType: 'json',
    async: false,
    data: { functionname: 'getSurveys' },
    success: function (obj, textstatus) {
        if (!('error' in obj)) {
            surveys = obj.result;
        }
        else {
            console.log(obj.error);
        }
    }
});

$.ajax({
    type: "POST",
    url: './php/home-page-mysql.php',
    dataType: 'json',
    data: { functionname: 'getCompletedSurveys', arguments: [username] },
    success: function (obj, textstatus) {
        if (!('error' in obj)) {
            completedSurveys = obj.result;
        }
        else {
            console.log(obj.error);
        }
    }
});




if (surveys.length > 0){
    availableSurveys.innerHTML = "You have surveys available!"
}

// this listens for the user to click the 'submit feedback' button and then adds it to the feedback dictionary as "answer". it also takes the feedbackID and increments it by 1 and adds it to the feedback dictionary as "feedbackID"
// i would like this to save whatever is in the feedbackField into the Feedback database while also checking to see what the last feedbackID is and incrementing by 1 before adding 
feedbackButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentFeedbackField.value != '') {
        feedback = currentFeedbackField.value;
        $.ajax({
            type: "POST",
            url: './php/home-page-mysql.php',
            dataType: 'json',
            data: { functionname: 'writeFeedback', arguments: [feedback] },
            success: function (obj, textstatus) {
                if (!('error' in obj)) {
                    completedSurveys = obj.result;
                }
            }
        });
        alert('Thank you for your feedback!')
        currentFeedbackField.value = '';
    } else {
        alert('You must enter feedback before you can submit.');
    }
});

// this listens for the user to click the 'logout' button and then takes the user back to the login page while also clearing sessionStorage
logoutButton.addEventListener("click", (event) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = './login-page.html';
});