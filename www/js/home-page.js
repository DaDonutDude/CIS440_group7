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

$.ajax({
    type: "POST",
    url: './php/home-page-mysql.php',
    dataType: 'json',
    data: { functionname: 'getUser', arguments: [username] },
    success: function (obj, textstatus) {
        if (!('error' in obj)) {
            user = obj.result;
            homepageNameLabel.innerHTML = user[0][0] + " " + user[0][1];
            userTotalPoints.innerHTML = user[0][2];
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


window.onload = (e) => {
    let surveyTypeButtons = document.getElementById("surveyTypeButtons");
    console.log(surveys.length);
    console.log(completedSurveys.length);
    if (completedSurveys.length < surveys.length) {
        availableSurveys.innerHTML = "You have surveys available!"
        let takenSurveys = [];
        for (let idx = 0; idx < completedSurveys.length; idx++) {
            takenSurveys.push(parseInt(completedSurveys[idx]));
        }
        console.log(takenSurveys);
        for (let idx = 0; idx < surveys.length; idx++) {
            if (!takenSurveys.includes(parseInt(surveys[idx][0]))) {
                let button = document.createElement("button");
                switch (surveys[idx][1]) {
                    case 'multiplechoice':
                        button.innerHTML = 'Multiple Choice';
                        break;
                    case 'numericalscale':
                        button.innerHTML = 'Numerical Scale';
                        break;
                    default:
                        button.innerHTML = 'Short Answer';
                        break;
                }
                button.onclick = function () {
                    sessionStorage.setItem('surveyID', surveys[idx][0]);
                    window.location.href = "survey-page.html";
                };
                surveyTypeButtons.appendChild(button);
            }
        }
    } else {
        availableSurveys.innerHTML = "Congratulations! You've completed this week's surveys!"
    }
};



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
logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = './login-page.html';
});