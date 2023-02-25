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
    async: false,
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
    if (completedSurveys.length < surveys.length) {
        availableSurveys.innerHTML = "You have surveys available!"
        let takenSurveys = [];
        for (let idx = 0; idx < completedSurveys.length; idx++) {
            takenSurveys.push(parseInt(completedSurveys[idx]));
        }
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
                var newDiv = document.createElement('div');
                newDiv.appendChild(button);
                surveyTypeButtons.appendChild(newDiv);
            }
        }
    } else {
        availableSurveys.innerHTML = "Congratulations! You've completed this week's surveys!"
    }
};

// this listens for the user to click the 'logout' button and then takes the user back to the login page while also clearing sessionStorage
logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = './login-page.html';
});