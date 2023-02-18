"use strict"

let points;
let survey_complete_div = document.getElementById('survey_complete_div');
let user_points_div = document.getElementById('user_points_div');
let error_div = document.getElementById('error_div');

survey_complete_div.style.visibility = 'hidden';
user_points_div.style.visibility = 'hidden';
error_div.style.visibility = 'hidden';

//swap 'type' for survey[1] which should access the type of survey from survey-page.js line 16
function set_survey_type(type) {
    switch (type) {
        case 'multiplechoice':
            points = 50;
            break;
        case 'numericalscale':
            points = 50;
            break;
        case 'shortanswer':
            points = 100;
            break;
        default:
            points = 0;
            break;
        }

    // this should probably check for surveyID from database 
    if (survey_log.includes(type)) {
        survey_complete_div.style.visibility = 'hidden';
        user_points_div.style.visibility = 'hidden';
        error_div.style.visibility = 'visible';
        error_div.innerHTML = "You have already taken this survey. No additional points have been added. ";
    } else {
        error_div.style.visibility = 'hidden';
        survey_log.push(type);
        sessionStorage.setItem('survey_log', JSON.stringify(type));
        console.log("You have earned " + points + " points");
        total_points += points;
        update_html();
    }
    
}

function update_html() {
    survey_complete_div.style.visibility = 'visible';
    user_points_div.style.visibility = 'visible';
    document.getElementById('points_earned').innerHTML = points;
    document.getElementById('user').innerHTML = username;
    document.getElementById('user_total_points').innerHTML = total_points;

    update_log();
}

function update_log() {
    let log = JSON.parse(sessionStorage.getItem('point_log'));
    log.push(points);
    sessionStorage.setItem('point_log', JSON.stringify(log));
    console.log(JSON.parse(sessionStorage.getItem('point_log')));
    update_database();
}

//this needs pushed to database
function update_database() {
    sessionStorage.setItem("total_points", total_points);
}

function take_me_home() {
    window.location.href = "./user-home.html";
}